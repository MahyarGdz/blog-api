import { Role } from "../../modules/users/schemas/user.schema";

export interface TokenPayload {
  id: string;
  role: Role;
}
