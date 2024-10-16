import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()  
  @IsNotEmpty()
  username: string;

  @IsString()  
  @IsNotEmpty()
  name: string;

  @IsString()  
  @IsNotEmpty()
  lastName: string;

  @IsString()  
  @IsNotEmpty()
  email: string;

  @IsString()  
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role: {
    connect: {
      id: number;
    };
  };

  }
