import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional } from "class-validator";

export class PaginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    page: number = 1;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    perPage: number = 10;

    @ApiPropertyOptional()
    @IsOptional({ each: true })
    @IsObject({ each: true })
    filters?: Record<string, string>;
};
