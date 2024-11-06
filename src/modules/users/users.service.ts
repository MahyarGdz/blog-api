import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Role, User, UserDoc } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<UserDoc | null> {
    return this.userModel.findOne({ email });
  }

  async createUser(email: string, hashedPassword: string): Promise<User> {
    // Check if this is the first user
    const isFirstUser = (await this.userModel.countDocuments()) === 0;
    const role = isFirstUser ? Role.ADMIN : Role.USER;

    const newUser = new this.userModel({ email, password: hashedPassword, role });
    return newUser.save();
  }

  async findById(id: string) {
    return this.userModel.findById(id, { password: 0 });
  }
}
