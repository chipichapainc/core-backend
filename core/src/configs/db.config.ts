import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DBConfig {
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly DATABASE_HOST: string

    @Expose()
    @IsOptional()
    @IsString()
    readonly DATABASE_PORT: string = "5432"

    @Expose()
    @IsOptional()
    @IsString()
    readonly DATABASE_USERNAME: string = "postgres"

    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly DATABASE_PASSWORD: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly DATABASE_NAME: string
}