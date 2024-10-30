import { Module } from '@nestjs/common';
import { LiqPayService } from './liqpay.service';

@Module({
    imports: [],
    providers: [LiqPayService],
    exports: [LiqPayService]
})
export class LiqPayModule {}
