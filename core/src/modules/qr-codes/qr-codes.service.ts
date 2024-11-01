import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiEnvConfig } from "src/configs/api.config";
import { TicketEntity } from "../tickets/entities/ticket.entity";
import { QRCodes } from "./qr-codes.generator";

@Injectable()
export class QRCodesService {
    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService<ApiEnvConfig>
    ) {}

    async generateTicketQR(ticket: TicketEntity): Promise<string> {
        return new Promise((res, rej) => {
            try {
                const domain = this.configService.getOrThrow("DOMAIN")
                const params = new URLSearchParams()
                params.append("c", ticket.id)
                params.append("h", ticket.hash)
                const dataUrl = QRCodes.generateDataUrl(
                    `${domain}/api/tickets/verify?${params.toString()}`
                )
                return res(dataUrl)
            } catch (e) {
                return rej(e)
            }
        })
    }
}