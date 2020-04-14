import { UserRole } from "src/users/users/models/user-role";

export interface UserPayload {
  userId: number;
  email: string;
  role?: UserRole;
}
