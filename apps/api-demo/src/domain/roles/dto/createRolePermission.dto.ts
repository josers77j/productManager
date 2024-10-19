import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRolePermissionDto {
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @IsNumber()
    @IsNotEmpty()
    permissionId: number;
}