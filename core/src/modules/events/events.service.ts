import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventsRepository: Repository<EventEntity>
    ) { }

    async findAll() {
        const events = await this.eventsRepository.find()
        return events
    }

    async findOneById(id: string) {
        const event = await this.eventsRepository.findOneBy({ id })
        return event
    }

    async updateCodeSeedById(id: string, seed: number, uses: number) {
        return await this.eventsRepository.update(
            { id }, 
            { codeSeed: seed, codesGenerated: uses }
        )
    }
}
