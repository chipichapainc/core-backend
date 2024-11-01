import { Encoder, Byte } from '@nuintun/qrcode';

export class QRCodes {
    static async generateDataUrl(data: string) {
        const encoder = new Encoder({ level: "M" });
        const qrcode = encoder.encode(
            new Byte(data)
        )
        return qrcode.toDataURL()
    }
}