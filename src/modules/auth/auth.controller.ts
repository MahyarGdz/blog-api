import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { UserDTO } from "./dto/user.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "create new user ==> note first user has role of admin" })
  @ApiCreatedResponse({ description: "create new user" })
  async register(@Body() createUserDto: UserDTO) {
    return this.authService.createNewUser(createUserDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "login with user credential and get access token" })
  @ApiOkResponse()
  async login(@Body() loginUserDto: UserDTO) {
    return this.authService.login(loginUserDto);
  }
}
