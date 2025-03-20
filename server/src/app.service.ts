import { Injectable } from "@nestjs/common";
import { RolesService } from "./roles/roles.service";
import { UsersService } from "./users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AppService {
  constructor(
    private roleService: RolesService,
    private usersService: UsersService,
  ) {}
  async createDefault() {
    await this.roleService.createRole({
      value: "ADMIN",
      description: "Administrator",
    });
    await this.roleService.createRole({
      value: "USER",
      description: "Regular User",
    });
    const user = await this.usersService.createUser({
      email: "mail@mail.com",
      password: await bcrypt.hash("test", 5),
    });
    await this.usersService.updateUser({
      id: user.id,
      name: "Test User",
    });
    await this.usersService.addRole({
      value: "ADMIN",
      userId: user.id,
    });
    return "Success";
  }
}
