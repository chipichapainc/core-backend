import { Body, Controller, HttpCode, Inject, Logger, Post, UnauthorizedException } from "@nestjs/common";
import { LiqPayService } from "../../liqpay/liqpay.service";
import { LiqPayApiParams } from "../../liqpay/types/liqpay-api-params";
import { ILiqPayApiParams } from "../../liqpay/types/liqpay-api-params.interface";
import { validateClass } from "src/common/helpers/validate-class.helper";
import { ILiqPayCallback } from "../../liqpay/types/liqpay-callback.interface";
import { OrdersService } from "src/modules/orders/orders.service";
import { QRCodesService } from "src/modules/qr-codes/qr-codes.service";
import { EmailsService } from "src/modules/emails/emails.service";

@Controller('liqpay/webhooks')
export class OrderPaymentsLiqPayWebhooksController {
    private readonly logger = new Logger(OrderPaymentsLiqPayWebhooksController.name)

    constructor(
        @Inject(LiqPayService)
        private readonly liqpayService: LiqPayService,
        @Inject(OrdersService)
        private readonly ordersService: OrdersService,
        @Inject(QRCodesService)
        private readonly QRCodesService: QRCodesService,
        @Inject(EmailsService)
        private readonly emailsService: EmailsService,
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
                const {
                    order,
                    tickets
                } = await this.ordersService.finish(data.order_id);

                const ticketsWithQRCodes = await Promise.all(
                    tickets.map(
                        async ticket => ({
                            ticket,
                            qr: await this.QRCodesService.generateTicketQR(ticket)
                        })
                    )
                )
                await this.emailsService.sendTicketEmail(
                    order.email,
                    ticketsWithQRCodes,
                )
            }
        } catch(e) {
            this.logger.error(e)
        } finally {
            return 'OK'
        }
    }
}