import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

import { BlogsService } from "./blogs.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
// import { Roles } from "../../common/decorator/role.decorator";
import { Roles } from "../../common/decorator/role.decorator";
import { SUser } from "../../common/decorator/user.decorator";
import { MongoIdDto } from "../../common/dto/mongo-id.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserDoc } from "../users/schemas/user.schema";

@Controller("blogs")
@ApiTags("Blogs")
export class BlogsController {
  constructor(private BlogsService: BlogsService) {}

  @Post()
  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "create blog ==> should login as admin" })
  @ApiCreatedResponse()
  async create(@Body() createBlogDto: CreateBlogDto, @SUser() user: UserDoc) {
    return this.BlogsService.createBlog(createBlogDto, user._id.toString());
  }

  @Get()
  @ApiOperation({ summary: "get all blogs" })
  @ApiOkResponse()
  async findAll() {
    return this.BlogsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "get blog with its id" })
  @ApiParam({ description: "the blog id", name: "id", required: true })
  @ApiOkResponse()
  async findOne(@Param() paramDto: MongoIdDto) {
    return this.BlogsService.findOne(paramDto.id);
  }

  @Patch(":id")
  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "update blog with its id ==> login as admin" })
  @ApiParam({ description: "the blog id", name: "id", required: true })
  @ApiOkResponse()
  async updateBlog(@Body() updateBlogDto: UpdateBlogDto, @Param() paramDto: MongoIdDto) {
    return this.BlogsService.updateBlog(updateBlogDto, paramDto.id);
  }

  @Delete(":id")
  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "delete blog with its id ==> login as admin" })
  @ApiParam({ description: "the blog id", name: "id", required: true })
  @ApiOkResponse()
  async delete(@Param() paramDto: MongoIdDto) {
    return this.BlogsService.delete(paramDto.id);
  }
}
