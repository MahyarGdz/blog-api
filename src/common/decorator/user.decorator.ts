import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const SUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return req.user;
});