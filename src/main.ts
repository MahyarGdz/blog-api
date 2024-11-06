import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./core/exceptions/http.exception";
import { ResponseInterceptor } from "./core/interceptor/response.interceptor";

async function bootstrap() {
  const logger = new Logger("APP");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets("uploads", { prefix: "/images" });
  app.set("trust proxy", 1);

  app.enableCors({
    origin: true,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  const configs = new DocumentBuilder()
    .setTitle("Blog Api")
    .setDescription("blog api swagger docs")
    .setVersion("0.0.1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "JWT",
    )
    .build();

  const docs = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup("/api-docs", app, docs);

  app.disable("x-powered-by");
  const port = process.env.PORT ?? 3000;

  await app.listen(port, () => {
    logger.log(`app starting at http://localhost:${port}`);
  });
}
bootstrap();
