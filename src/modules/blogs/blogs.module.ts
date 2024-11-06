import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { Blog, BlogSchema } from "./schemas/blogs.schema";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [MongooseModule],
})
export class BlogsModule {}
