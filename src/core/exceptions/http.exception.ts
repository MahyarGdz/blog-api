import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse();
    const message = this.extractMessage(exceptionResponse);

    response.status(status).json({
      statusCode: status,
      success: false,
      error: {
        message,
      },
    });
  }

  private extractMessage(response: string | Record<string, any>): string | string[] {
    if (typeof response === "string") {
      return response;
    }

    if (typeof response === "object" && "message" in response) {
      return response.message;
    }

    return "something wrong";
  }
}
