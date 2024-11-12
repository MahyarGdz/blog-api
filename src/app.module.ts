import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpLogger } from "./core/middleware/logger.middleware";
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
      cache: true,
    }),
    BlogsModule,
    AuthModule,
    UsersModule,
    UploaderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLogger).forRoutes("*");
  }
}
