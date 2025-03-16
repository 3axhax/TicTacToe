import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller("roles")
export class RolesController {
  constructor(private RolesService: RolesService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.RolesService.createRole(roleDto);
  }
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.RolesService.getRole(value);
  }
}
