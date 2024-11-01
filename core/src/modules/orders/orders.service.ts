import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateOrderParams, TCreateOrderProperties } from './types/create-order.interface';
import { EventsService } from '../events/events.service';
import { OrderEntity } from './entities/order.entity';
import { LiqPayService } from '../liqpay/liqpay.service';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @Inject(EventsService)
        private readonly eventsService: EventsService,
        @Inject(TicketsService)
        private readonly ticketsService: TicketsService,
        @Inject(LiqPayService)
        private readonly liqpayService: LiqPayService,
    ) { }

    async createOne(params: ICreateOrderParams) {
        const event = await this.eventsService.findOneById(params.eventId)
        if(!event)
            throw new NotFoundException("Event not found")

        const order = await this.orderRepository.save({
            email: params.email,
            eventId: event.id,
            amount: event.ticketPrice,
            currency: event.ticketPriceCurr
        } as TCreateOrderProperties)

        const paymentParams = await this.liqpayService.getApiParams({
            action: "pay",
            amount: event.ticketPrice,
            currency: event.ticketPriceCurr,
            description: "Ticket purchase",
            internalOrderId: order.id
        })

        return {
            order,
            paymentParams
        }
    }

    async finish(orderId: string) {
        let order = await this.orderRepository.findOneBy({
            id: orderId
        })
        if(!order)
            throw new NotFoundException("Order not found")

        order.isPaid = true
        order.paidAt = new Date()

        order = await this.orderRepository.save(order)

        const tickets = await this.ticketsService.createMany({
            count: 1,
            eventId: order.eventId,
            isPaid: true
        })

        return {
            order,
            tickets
        }
    }
}
