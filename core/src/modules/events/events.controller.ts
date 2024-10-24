import { Controller, Get, Inject, Req } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller('events')
export class EventsController {
    constructor(
        @Inject(EventsService)
        private readonly eventsService: EventsService
    ) {}

    @Get('/')
    findAll() {
        return this.eventsService.findAll()
    }
}