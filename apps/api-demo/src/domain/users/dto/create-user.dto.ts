import { IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    nombre:string;
    
    @IsString()
    email:string;
}
