import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { EventsModule } from '../events/events.module';
import { TicketsService } from './tickets.service';
import { CryptoModule } from '../crypto/crypto.module';
import { CodeGeneratorModule } from '../code-generator/code-generator.module';
import { ConfigModule } from '@nestjs/config';
import { cryptoEnvConfig } from 'src/configs/configs';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketEntity]),
        ConfigModule.forFeature(cryptoEnvConfig),
        EventsModule,
        CodeGeneratorModule,
        CryptoModule,
    ],
    providers: [TicketsService],
    exports: [TicketsService]
})
export class TicketsModule {}
