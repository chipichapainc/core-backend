import { Module } from '@nestjs/common';
import { LiqPayService } from './liqpay.service';
import { ConfigModule } from '@nestjs/config';
import { liqpayEnvConfig } from 'src/configs/configs';

@Module({
    imports: [ConfigModule.forFeature(liqpayEnvConfig)],
    providers: [LiqPayService],
    exports: [LiqPayService]
})
export class LiqPayModule {}
