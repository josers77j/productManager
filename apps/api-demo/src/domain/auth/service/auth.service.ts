import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/domain/users/service/users.service";
import { RegisterDto } from "../dto/register.dto";
import * as bcryptjs from "bcryptjs";
import { LoginDto } from "../entities/auth.entity";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}
  async register({ password, email, name, lastname }: RegisterDto) {
    //const user = await this.usersService.findOneByEmail(email);
const user = '';
    if (user) {
      throw new BadRequestException("Email already exists");
    }

    //const hashedPassword = await bcryptjs.hash(password, 10);

    // await this.usersService.create({
    //   name,
    //   email,
    //   lastname,
    //   password: hashedPassword,
    // });

    return {
      message: "User created successfully :D",
    };
  }

  async login({ username, password }: LoginDto) {
    // const user = await this.usersService.findOneByEmail(username);

    // if (!user) {
    //   throw new UnauthorizedException("Invalid email");
    // }

    // const isPasswordValid = await bcryptjs.compare(password, user.password);

    // if (!isPasswordValid) {
    //   throw new UnauthorizedException("Invalid password");
    // }
    // const payload = { email: user.email };

    // const token = await this.jwtService.signAsync(payload);

    // return {
    //   token: token,
    //   email: user.email,
    // };
  }
}
