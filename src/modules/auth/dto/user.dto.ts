import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDTO {
  @ApiProperty({ description: "user email", example: "default@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "user password", example: "strongPassword" })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;
}
