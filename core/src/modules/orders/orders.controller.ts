import { Body, Controller, Get, Inject, Post, Req } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderInput } from "./types/create-order.input";

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(OrdersService)
        private readonly ordersService: OrdersService
    ) {}

    @Post('/')
    create(@Body() body: CreateOrderInput) {
        return this.ordersService.createOne({
            eventId: body.eventId,
            email: body.email
        })
    }
}