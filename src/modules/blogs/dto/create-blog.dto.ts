import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  @ApiProperty({ description: "title of blog", example: "nice blog title" })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(15, 500)
  @ApiProperty({ description: "the content of blog", example: "nice blog content .................." })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "image url of blog", example: "https://blog.com/image.png" })
  imageUrl: string;
}
