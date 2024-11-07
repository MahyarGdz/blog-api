import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TokenPayload } from "../../../common/types/token-payload.type";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authorization: string | undefined = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer")) throw new ForbiddenException("auth header is missing");
    const token = authorization.substring(7);

    try {
      const payload = (await this.jwtService.verifyAsync(token)) as TokenPayload;
      const user = await this.userService.findById(payload.id);

      if (!user) throw new UnauthorizedException();
      // if user exist return true
      req.user = user;
      return true;
    } catch (err) {
      this.logger.warn(err);
      throw new ForbiddenException("token is expired or invalid");
    }
  }
}
