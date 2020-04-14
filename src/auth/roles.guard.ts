import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/users/models/user-role';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(request);
    console.log(user);
    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: UserRole[], userRole: UserRole): boolean {
    if (roles) {
      return roles.some(role => {
        return (role === userRole);
      });
    } else {
      return false;
    }
  }
}
