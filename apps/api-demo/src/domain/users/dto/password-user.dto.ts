import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class passwordUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}