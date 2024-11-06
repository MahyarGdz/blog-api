import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class MongoIdDto {
  @IsNotEmpty()
  @IsMongoId({ message: "Id should be 24 hex string" })
  @ApiProperty({ description: "id of docs that want to get (MONGO_ID)", example: "672bb4c8629e05b5a27a5c7d", required: true })
  id: string;
}
