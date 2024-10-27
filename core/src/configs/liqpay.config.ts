import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class LiqPayEnvConfig {
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly LIQPAY_PUBLIC_KEY: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly LIQPAY_SECRET_KEY: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly DOMAIN: string
}