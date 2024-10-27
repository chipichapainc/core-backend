import { IsBase64, IsHash, IsNotEmpty, IsString } from "class-validator";
import { ILiqPayApiParams } from "./liqpay-api-params.interface";
import { Expose } from "class-transformer";

export class LiqPayApiParams implements ILiqPayApiParams {
    @Expose()
    @IsNotEmpty()
    @IsString()
    signature: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsBase64()
    data: string;
}