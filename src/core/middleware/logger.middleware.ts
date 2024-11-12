import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class HttpLogger implements NestMiddleware {
  private readonly logger = new Logger(HttpLogger.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, baseUrl } = req;
    const userAgent = req.get("user-agent") || "";
    const startAt = process.hrtime();

    res.on("finish", () => {
      const { statusCode } = res;
      const contentLength = res.get("content-length") || 0;
      const dif = process.hrtime(startAt);
      const responseTime = dif[0] * 1e3 + dif[1] * 1e-6;
      this.logger.log(`${method} - ${baseUrl} - ${statusCode} - ${contentLength} - ${userAgent} - ${ip} - ${responseTime.toFixed(2)}ms`);
    });

    next();
  }
}
