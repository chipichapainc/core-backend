import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { In, Repository } from 'typeorm';
import { ICreateTicketParams, TCreateTicketProperties } from './types/create-ticket.interface';
import { EventsService } from '../events/events.service';
import { CodeGenerator, CodeGeneratorFactory } from '../code-generator/code-generator-factory';
import { EventEntity } from '../events/entities/event.entity';
import { CryptoService } from '../crypto/crypto.service';
import { ConfigService } from '@nestjs/config';
import { CryptoConfig } from 'src/configs/crypto.config';
import { CodeGeneratorFactoryProvider } from '../code-generator/code-generator.provider';

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
        private readonly configService: ConfigService<CryptoConfig>,
        @Inject(CodeGeneratorFactoryProvider.TICKETS)
        private readonly codeGeneratorFactory: CodeGeneratorFactory,
        
    ) { }

    async generateTicketCodesByEventId(eventId: string, n: number) {
        const event = await this.eventsService.findOneById(eventId)
        return this.generateTicketCodes(event, n)
    }
    async generateTicketCodes(event: EventEntity, n: number) {
        const generator = this.codeGeneratorFactory.make(event.codeSeed)

        const codes: string[] = []
        for (let i = 0; i < n; i++) {
            const code = await generator.generate()
            codes.push(`${event.prefix}-${code}`)
        }   

        await this.eventsService.updateCodeSeedById(
            event.id, 
            generator.state,
            generator.uses
        )

        return codes
    }

    async createMany(params: ICreateTicketParams) {
        const event = await this.eventsService.findOneById(params.eventId)

        const codes = await this.generateTicketCodes(
            event,
            params.count
        )
        
        const duplicatesCount = await this.ticketsRepository.countBy({
            id: In(codes)
        })
        if(duplicatesCount > 0)
            throw new Error("Found duplicate ticket codes. Tickets not created.")

        const ticketsProperties = await Promise.all(
            codes.map(async code => {
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
