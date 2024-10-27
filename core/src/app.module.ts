import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/typeorm-datasource';
import { CryptoModule } from './modules/crypto/crypto.module';
import { EventsModule } from './modules/events/events.module';
import { CodeGeneratorModule } from './modules/code-generator/code-generator.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIGS } from './configs/configs';
import { LiqPayModule } from './modules/liqpay/liqpay.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: CONFIGS
        }),
        CryptoModule,
        CodeGeneratorModule,
        LiqPayModule,

        TypeOrmModule.forRoot(dbConfig),

        TicketsModule,
        OrdersModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
