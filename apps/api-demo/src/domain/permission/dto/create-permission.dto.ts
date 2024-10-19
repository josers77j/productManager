import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty()
    @IsString()
    action:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsNumber()
    resourceId:number;
}
