import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/typeorm-datasource';
import { CryptoModule } from './modules/crypto/crypto.module';
import { EventsModule } from './modules/events/events.module';
import { CodeGeneratorModule } from './modules/code-generator/code-generator.module';
import { LiqPayModule } from './modules/liqpay/liqpay.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { OrdersModule } from './modules/orders/orders.module';
import { EmailsModule } from './modules/emails/emails.module';
import { OrderPaymentsModule } from './modules/order-payments/order-payments.module';
import { QRCodesModule } from './modules/qr-codes/qr-codes.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConfig),
        
        CryptoModule,
        CodeGeneratorModule,
        LiqPayModule,
        EmailsModule,
        QRCodesModule,

        OrdersModule,
        OrderPaymentsModule,
        TicketsModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
