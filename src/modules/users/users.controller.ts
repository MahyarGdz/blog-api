import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserDoc } from "./schemas/user.schema";
import { UsersService } from "./users.service";
import { SUser } from "../../common/decorator/user.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private userService: UsersService) {}
  //
  @Get("info")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "get current logged in user info" })
  @ApiOkResponse()
  getUserInfo(@SUser() user: UserDoc) {
    return this.userService.findById(user._id.toString());
  }
}
