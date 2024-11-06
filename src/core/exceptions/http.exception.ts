import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    const responseData = exception.getResponse();
    let message: string | string[];

    if (typeof responseData === "object" && Reflect.has(responseData, "message")) {
      message = Reflect.get(responseData, "message");
    } else if (typeof responseData === "string") {
      message = responseData;
    } else {
      message = "something wrong";
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      error: {
        message: message,
      },
    });
  }
}
