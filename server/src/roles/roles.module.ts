import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { User } from "../users/users.model";
import { UserRole } from "./users-roles.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRole])],
  exports: [RolesService],
})
export class RolesModule {}
