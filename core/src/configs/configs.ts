import { ConfigFactory } from "@nestjs/config";
import { ClassConstructor } from "class-transformer";
import { CryptoEnvConfig } from "./crypto.config";
import { DatabaseEnvConfig } from "./db.config";
import { LiqPayEnvConfig } from "./liqpay.config";
import { validateClass } from "src/common/helpers/validate-class.helper";

export const configFactoryEnv = <T extends object>(cls: ClassConstructor<T>) => 
    function() {
        const { success, instance, errors } = validateClass(process.env, cls)
        if(!success)
            throw errors[0]
        
        return instance
    }

export const CONFIGS: (ConfigFactory | Promise<ConfigFactory>)[] = [
    configFactoryEnv(CryptoEnvConfig),
    configFactoryEnv(DatabaseEnvConfig),
    configFactoryEnv(LiqPayEnvConfig)
]