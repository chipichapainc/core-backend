import { ConfigFactory } from "@nestjs/config";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { CryptoConfig } from "./crypto.config";
import { DBConfig } from "./db.config";

const configFactoryEnv = <T extends object>(cls: ClassConstructor<T>) => 
    function () {
        const transformedConfig = plainToInstance(
            cls,
            process.env,
            { 
                enableImplicitConversion: true, 
                excludeExtraneousValues: true 
            },
        );
        const errors = validateSync(
            transformedConfig,
            { skipMissingProperties: false }
        );
        if (errors.length > 0)
            throw new Error(errors.toString());
        return transformedConfig
    }


export const CONFIGS: (ConfigFactory | Promise<ConfigFactory>)[] = [
    configFactoryEnv(CryptoConfig),
    configFactoryEnv(DBConfig),
]