import { Expose, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, validateSync } from "class-validator";

class CryptoConfig {
    @Expose()
    @IsNotEmpty()
    @IsString()
    TICKET_CODE_HASH_SECRET: string
}

export const cryptoConfig = () => {
    const validatedConfig = plainToInstance(
        CryptoConfig,
        process.env,
        { 
            enableImplicitConversion: true, 
            excludeExtraneousValues: true 
        },
    );
    const errors = validateSync(
        validatedConfig,
        { skipMissingProperties: false }
    );

    if (errors.length > 0)
        throw new Error(errors.toString());
    return {
        secret: parseInt(process.env.PORT, 10) || 3000,
    }
};