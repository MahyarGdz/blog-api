import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSchema } from "mongoose";

import { User } from "../../users/schemas/user.schema";

export type BlogDoc = HydratedDocument<Blog>;

@Schema({ timestamps: true, toJSON: { versionKey: false } })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: MSchema.Types.ObjectId, required: true, ref: "User" })
  author: User;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
