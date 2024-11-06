import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UploadFileDto } from "./dto/uploadfile.dto";
import { UploaderService } from "./uploader.service";
// import { Roles } from "../../common/decorator/role.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("uploader")
@ApiTags("Uploader")
@UseGuards(AuthGuard)
@UseInterceptors(FileInterceptor("image"))
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post("single")
  // @Roles("admin")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "upload a single file" })
  @ApiCreatedResponse({ description: "the file uploaded successfully!" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadFileDto,
  })
  public uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploaderService.uploadSingle(file);
  }
}
