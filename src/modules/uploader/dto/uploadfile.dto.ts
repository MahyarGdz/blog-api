import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
  @ApiProperty({ type: "string", format: "binary", required: true, nullable: false })
  image: Express.Multer.File;
}
