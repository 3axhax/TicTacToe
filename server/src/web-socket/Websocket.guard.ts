import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class WebsocketGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToWs().getClient().handshake.auth.token;
    try {
      const user = this.jwtService.verify(token);
      if (user) {
        return !!(await this.usersService.getUserById(user.id));
      }
    } catch (e) {
      return false;
    }
    return false;
  }
}
