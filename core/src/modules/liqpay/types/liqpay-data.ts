import { Expose } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length } from "class-validator"
import { ECurrency } from "src/common/types/currency.enum"

export class LiqPayData {
    @Expose()
    @IsNotEmpty()
    @IsEnum([
        "pay",
        "hold",
        "subscribe",
        "paydonate"
    ])
    action: "pay" | "hold" | "subscribe" | "paydonate" = "pay"

    // Integer, money in atomic currency fraction
    @Expose()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    amount: number

    @Expose()
    @IsNotEmpty()
    @IsEnum([
        ECurrency.USD,
        ECurrency.UAH,
        ECurrency.EUR
    ])
    currency: ECurrency = ECurrency.UAH

    @Expose()
    @IsNotEmpty()
    @IsString()
    description: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    internalOrderId: string

    @Expose()
    @IsOptional()
    @IsString()
    expiresAt?: string

    @Expose()
    @IsOptional()
    @IsEnum(["uk", "en"])
    language?: "uk" | "en"

    @Expose()
    @IsOptional()
    @IsEnum([
        "apay", 
        "gpay",
        "card",
        "privat24",
        "moment_part",
        "paypart",
        "cash",
        "invoice",
        "qr",
    ])
    payTypes?: "apay" | "gpay" | "card" | "privat24" | "moment_part" | "paypart" | "cash" | "invoice" | "qr"

    @Expose()
    @IsOptional()
    @IsUrl()
    @Length(0, 510)
    redirectUrl?: string

    @Expose()
    @IsOptional()
    @IsString()
    verifyCode?: string
}
