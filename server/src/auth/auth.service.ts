import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return {
      ...token,
      name: user.name,
    };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("This user exist", HttpStatus.BAD_REQUEST);
    }

    console.log(userDto);
    console.log("name", userDto.name ? userDto.name : userDto.email);
    console.log("name bool", !!userDto.name);

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      name: userDto.name ? userDto.name : userDto.email,
      password: hashPassword,
    });
    const token = await this.generateToken(user);
    return {
      ...token,
      name: user.name,
    };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException("Incorrect Email or Password");
  }
}
