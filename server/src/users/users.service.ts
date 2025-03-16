import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto, UpdateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRole("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {email},
      include: {all: true},
    });
  }

  async updateUser(dto: UpdateUserDto) {
    const { id, ...params } = dto;
    return await this.userRepository.update(params, { where: { id: id } });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRole(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("User or Role not found", HttpStatus.NOT_FOUND);
  }
}
