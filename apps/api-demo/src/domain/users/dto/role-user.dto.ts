import { IsNotEmpty, IsNumber } from "class-validator";

export class RoledUserDto {
    @IsNotEmpty()
    @IsNumber()
    roleId: string;
}