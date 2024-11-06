import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./modules/auth/auth.module";
import { BlogsModule } from "./modules/blogs/blogs.module";
import { UploaderModule } from "./modules/uploader/uploader.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.getOrThrow<string>("MONGO_URI"),
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlogsModule,
    AuthModule,
    UsersModule,
    UploaderModule,
  ],
})
export class AppModule {}
