import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}
export type UserDoc = HydratedDocument<User>;

@Schema({ timestamps: true, toJSON: { versionKey: false }, id: false })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, required: true, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
