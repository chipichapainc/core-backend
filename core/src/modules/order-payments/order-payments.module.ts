import { Module } from "@nestjs/common";
import { OrdersModule } from "../orders/orders.module";
import { LiqPayModule } from "../liqpay/liqpay.module";
import { OrderPaymentsLiqPayWebhooksController } from "./controllers/order-payments-liqpay-webhook.controller";

@Module({
    imports: [OrdersModule, LiqPayModule],
    controllers: [OrderPaymentsLiqPayWebhooksController],
})
export class OrderPaymentsModule {}