import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { Blog } from "./schemas/blogs.schema";

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(createBlogDto: CreateBlogDto, authorId: string) {
    const existBlog = await this.blogModel.findOne({ title: createBlogDto.title });
    if (existBlog) throw new BadRequestException("blog with this title exist");
    //
    const newBlog = new this.blogModel({ ...createBlogDto, author: authorId });
    await newBlog.save();

    return {
      message: "blog created",
      newBlog,
    };
  }

  async updateBlog(updateBlogDto: UpdateBlogDto, blogId: string) {
    //this is work because title exist in the dto it will has value and exist blog wont be null
    const existBlog = await this.blogModel.findOne({ title: updateBlogDto.title });
    if (existBlog) throw new BadRequestException("blog with this title exist");

    const updatedBlog = await this.blogModel.findByIdAndUpdate(blogId, { ...updateBlogDto }, { new: true });
    if (!updatedBlog) throw new BadRequestException("blog not found with this id");

    return {
      message: "blog updated",
      updatedBlog,
    };
  }

  async findAll() {
    return {
      blogs: await this.blogModel.find(),
    };
  }

  async findOne(blogId: string) {
    const blog = await this.blogModel.findById(blogId).populate({ path: "author", select: "email" });
    if (!blog) throw new BadRequestException("blog not found with this id");
    return { blog };
  }

  async delete(blogId: string) {
    const result = await this.blogModel.findByIdAndDelete(blogId);
    if (!result) throw new BadRequestException("blog not found with this id");
    return {
      message: "blog deleted",
    };
  }
}
