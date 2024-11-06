import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcrypt";

import { UsersService } from "../users/users.service";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: UserDTO) {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (!user) throw new BadRequestException("email or password is incorrect");

    const isPassMatch = await compare(loginUserDto.password, user.password);
    if (!isPassMatch) throw new BadRequestException("email or password is incorrect");

    return {
      accessToken: await this.jwtService.signAsync({ id: user._id, role: user.role }),
    };
  }
  async createNewUser(createUserDto: UserDTO) {
    const existUser = await this.usersService.findOne(createUserDto.email);
    if (existUser) throw new BadRequestException("this email exist. please use another email");
    const salt = await genSalt(10);
    const hashedPassword = await hash(createUserDto.password, salt);
    const user = await this.usersService.createUser(createUserDto.email, hashedPassword);

    return {
      message: "user registered",
      user: {
        email: user.email,
        role: user.role,
      },
    };
  }
}
