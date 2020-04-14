import { UserRole } from "../models/user-role";

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
}
