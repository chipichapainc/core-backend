import { Module } from '@nestjs/common';
import { LiqPayService } from './liqpay.service';
import { ConfigModule } from '@nestjs/config';
import { apiEnvConfig, joinConfigs, liqpayEnvConfig } from 'src/configs/configs';

@Module({
    imports: [
        ConfigModule.forFeature(joinConfigs(
            liqpayEnvConfig,
            apiEnvConfig
        ))
    ],
    providers: [LiqPayService],
    exports: [LiqPayService]
})
export class LiqPayModule {}
