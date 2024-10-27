import { Body, Controller, HttpCode, Inject, Logger, Post, UnauthorizedException } from "@nestjs/common";
import { LiqPayService } from "../liqpay.service";
import { LiqPayApiParams } from "../types/liqpay-api-params";
import { ILiqPayApiParams } from "../types/liqpay-api-params.interface";
import { validateClass } from "src/common/helpers/validate-class.helper";
import { OrdersService } from "src/modules/orders/orders.service";
import { ILiqPayCallback } from "../types/liqpay-callback.interface";

@Controller('liqpay/webhooks')
export class LiqPayWebhooksController {
    private readonly logger = new Logger(LiqPayWebhooksController.name)

    constructor(
        @Inject(LiqPayService)
        private readonly liqpayService: LiqPayService,
        @Inject(OrdersService)
        private readonly orderService: OrdersService,
    ) {}

    @HttpCode(200)
    @Post('/payment/finish')
    async handlePaymentFinish(@Body() body: ILiqPayApiParams) {
        const {
            success: isBodyValid,
            errors: validationErrors,
            instance: params
        } = validateClass(body, LiqPayApiParams)

        if(!isBodyValid)
            throw validationErrors[0]

        const data = this.liqpayService.decodeData<ILiqPayCallback>(params.data)

        const isSignatureValid = this.liqpayService.validateSignature(
            params.signature,
            params.data
        )

        if(!isSignatureValid)
            throw new UnauthorizedException("Webhook sig is invalid")

        try {
            console.dir(data, { depth: 10 })
            if(data.status === "success") {
                await this.orderService.finish(data.order_id)
            }
        } catch(e) {
            this.logger.error(e)
        } finally {
            return 'OK'
        }
    }
}