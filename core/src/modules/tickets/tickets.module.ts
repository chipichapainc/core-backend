import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { EventsModule } from '../events/events.module';
import { TicketsService } from './tickets.service';
import { CryptoModule } from '../crypto/crypto.module';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity]),
        EventsModule,
        CodeGeneratorModule,
        CryptoModule,
    ],
    providers: [TicketsService],
    exports: [TicketsService]
})
export class TicketsModule {}
