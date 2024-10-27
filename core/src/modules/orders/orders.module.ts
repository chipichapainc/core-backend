import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { OrdersService } from './orders.service';
import { LiqPayModule } from '../liqpay/liqpay.module';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity]),
        EventsModule,
        TicketsModule,
        LiqPayModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}
