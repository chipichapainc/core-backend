import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { apiEnvConfig } from 'src/configs/configs';
import { QRCodesService } from './qr-codes.service';

@Module({
    imports: [ConfigModule.forFeature(apiEnvConfig)],
    controllers: [],
    providers: [QRCodesService],
    exports: [QRCodesService],
})
export class QRCodesModule { }
