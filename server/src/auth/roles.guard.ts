import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";
import { UsersService } from "../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer !== "Bearer" || !token) {
        this.unauthorizedError();
      }
      const user = this.jwtService.verify(token);
      const userDB = await this.userService.getUserByEmail(user.email);
      req.user = userDB;
      return userDB.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException("Request Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  private unauthorizedError() {
    throw new UnauthorizedException({
      error_no: 401,
      error: "User unauthorized",
      statusCode: 401,
    });
    //throw new UnauthorizedException('User unauthorized');
  }
}
