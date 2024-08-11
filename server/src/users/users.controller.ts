import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@Controller('users')
export class UsersController {

    constructor(private UsersService: UsersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() userDto: CreateUserDto) {
        return this.UsersService.createUser(userDto);
    }
    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    getAll() {
        return this.UsersService.getAllUsers();
    }

    @Post('/role')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.UsersService.addRole(addRoleDto);
    }

    @Post('/ban')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    ban(@Body() banUserDto: BanUserDto) {
        return this.UsersService.ban(banUserDto);
    }
}
