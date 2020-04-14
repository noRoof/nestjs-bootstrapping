import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/users/models/user-role';

export const Roles = (...role: UserRole[]) => SetMetadata('roles', role);