import { Module } from "@nestjs/common";
import { OrdersModule } from "../orders/orders.module";
import { LiqPayModule } from "../liqpay/liqpay.module";
import { OrderPaymentsLiqPayWebhooksController } from "./controllers/order-payments-liqpay-webhook.controller";
import { EmailsModule } from "../emails/emails.module";
import { QRCodesModule } from "../qr-codes/qr-codes.module";

@Module({
    imports: [
        OrdersModule, 
        LiqPayModule, 
        QRCodesModule, 
        EmailsModule
    ],
    controllers: [
        OrderPaymentsLiqPayWebhooksController
    ],
})
export class OrderPaymentsModule {}