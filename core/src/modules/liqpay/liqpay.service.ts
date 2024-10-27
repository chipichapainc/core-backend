import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as LiqPay from 'liqpay-sdk-nodejs'
import { LiqPayEnvConfig } from 'src/configs/liqpay.config';
import { ILiqPayData } from './types/liqpay-data.interface';
import { LiqPayData } from './types/liqpay-data';
import { validateClass } from 'src/common/helpers/validate-class.helper';
import { ECurrency } from 'src/common/types/currency.enum';

export type LiqPatDataEncoded = string

@Injectable()
export class LiqPayService {
    private readonly liqpay: LiqPay

    private readonly logger = new Logger(LiqPayService.name)

    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService<LiqPayEnvConfig>,
    ) {
        try {
            this.liqpay = new LiqPay(
                this.configService.getOrThrow("LIQPAY_PUBLIC_KEY"), 
                this.configService.getOrThrow("LIQPAY_SECRET_KEY")
            );
        } catch(e) {
            this.logger.error(`Failed to init LiqPay`)
            throw e
        }
    }

    public decodeData<T>(data: string): T {
        return JSON.parse(atob(data))
    }
    public encodeData<T>(data: T) {
        return Buffer.from(JSON.stringify(data)).toString('base64')
    }

    public getSignature(data: string) {
        return this.liqpay.str_to_sign(
            this.configService.getOrThrow("LIQPAY_SECRET_KEY") 
            + data
            + this.configService.getOrThrow("LIQPAY_SECRET_KEY")
        );
    }

    public getApiParams(data: LiqPayData) {
        const {
            errors,
            instance,
            success: isDataValid
        } = validateClass(data, LiqPayData)

        if(!isDataValid)
            throw errors[0]

        const params: ILiqPayData = {
            version: 3,
            public_key: this.configService.getOrThrow("LIQPAY_PUBLIC_KEY"),
            action: instance.action,
            amount: instance.amount / 100,
            currency: instance.currency,
            description: instance.description,
            order_id: instance.internalOrderId,
            language: instance.language,
            server_url: `${this.configService.getOrThrow("DOMAIN")}/api/liqpay/webhooks/payment/finish`,
        }

        return this.liqpay.cnb_object(params)
    }

    public validateSignature(sig: string, data: LiqPatDataEncoded | ILiqPayData) {
        if(typeof data !== "string")
            data = this.encodeData(data)

        const origSig = this.getSignature(data)
        return sig === origSig
    }
}
