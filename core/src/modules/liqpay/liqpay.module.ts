import { Module } from '@nestjs/common';
import { LiqPayService } from './liqpay.service';
import { LiqPayWebhooksController } from './controllers/liqpay.webhook.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [OrdersModule],
    controllers: [LiqPayWebhooksController],
    providers: [LiqPayService],
    exports: [LiqPayService]
})
export class LiqPayModule {}
