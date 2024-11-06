import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploaderService {
  constructor(private configService: ConfigService) {}

  uploadSingle(file: Express.Multer.File) {
    if (!file) throw new BadRequestException("file not uploaded");
    const uploadedFile = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      filename: file.filename,
      size: file.size,
      url: `${this.configService.getOrThrow<string>("ASSETS_URL")}${file.filename}`,
    };

    return { uploadedFile };
  }
}
