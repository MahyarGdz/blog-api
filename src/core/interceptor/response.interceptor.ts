import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  //
  intercept(context: ExecutionContext, next: CallHandler<Record<string, unknown>>): Observable<unknown> {
    const ctx = context.switchToHttp().getResponse<Response>();
    const statusCode = ctx.statusCode;

    return next.handle().pipe(
      map((data) => {
        if (data && data?.data !== undefined) {
          return {
            statusCode: statusCode,
            success: true,
            data: data.data,
          };
        }
        return {
          statusCode: statusCode,
          success: true,
          data: data,
        };
      }),
    );
  }
}
