import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  password: string;
}
