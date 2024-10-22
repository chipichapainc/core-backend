import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TicketEntity])],
    providers: [],
    exports: []
})
export class TicketsModule {}
