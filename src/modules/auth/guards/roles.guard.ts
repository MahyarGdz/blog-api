// roles.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { ROLE_KEY } from "../../../common/decorator/role.decorator";
import { UserDoc } from "../../users/schemas/user.schema";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLE_KEY, context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserDoc;

    if (!roles.includes(user.role)) throw new ForbiddenException("user has not required role");

    return true;
  }
}
