import { randomUUID } from "crypto";
import { extname, join } from "path";

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

import { UploaderController } from "./uploader.controller";
import { UploaderService } from "./uploader.service";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: diskStorage({
            destination: join(process.cwd(), configService.getOrThrow<string>("UPLOAD_DEST")),
            filename: (_, file, cb) => {
              const ext = extname(file.originalname);
              cb(null, `${randomUUID()}${ext}`);
            },
          }),
          limits: {
            fileSize: configService.getOrThrow<number>("UPLOAD_LIMIT"),
          },
        };
      },
    }),
  ],
  controllers: [UploaderController],
  providers: [UploaderService],
  exports: [UploaderService],
})
export class UploaderModule {}
