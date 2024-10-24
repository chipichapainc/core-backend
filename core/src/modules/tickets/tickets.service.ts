import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { ICreateTicketParams, TCreateTicketProperties } from './types/create-ticket.interface';
import { EventsService } from '../events/events.service';
import { CodeGenerator } from '../code-generator/code-generator.service';
import { EventEntity } from '../events/entities/event.entity';
import { CryptoService } from '../crypto/crypto.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(TicketEntity)
        private readonly ticketsRepository: Repository<TicketEntity>,
        @Inject(EventsService)
        private readonly eventsService: EventsService,
        @Inject(CryptoService)
        private readonly cryptoService: CryptoService,
        @Inject(ConfigService)
        private readonly configService: ConfigService
    ) { }

    async generateTicketCodesByEventId(eventId: string, n: number) {
        const event = await this.eventsService.findOneById(eventId)
        return this.generateTicketCodes(event, n)
    }
    async generateTicketCodes(event: EventEntity, n: number) {
        const generator = new CodeGenerator(event.codeSeed)

        const codes: string[] = []
        for (let i = 0; i < n; i++) {
            codes.push(await generator.generate())
        }   

        await this.eventsService.updateSeedById(event.id, generator.state)

        return codes
    }

    async createMany(params: ICreateTicketParams) {
        const event = await this.eventsService.findOneById(params.eventId)

        const codes = await this.generateTicketCodes(
            event,
            params.count
        )
        const codesWithPrefixes = codes.map(code => `${event.prefix}-${code}`)
        
        const ticketsProperties = await Promise.all(
            codesWithPrefixes.map(async code => {
                return {
                    id: code,
                    eventId: event.id,
                    hash: await this.cryptoService.encrypt(
                        this.configService.getOrThrow("TICKET_CODE_HASH_SECRET"), 
                        code
                    ),
                    useMax: params.useLimit || 1
                } as TCreateTicketProperties
            })
        )

        const tickets = await this.ticketsRepository.save(ticketsProperties)
        return tickets
    }
}
