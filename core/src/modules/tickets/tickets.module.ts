import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { EventsModule } from '../events/events.module';
import { TicketsService } from './tickets.service';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity]),
        EventsModule,
        CryptoModule,
    ],
    providers: [TicketsService],
    exports: [TicketsService]
})
export class TicketsModule {}
