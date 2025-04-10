import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Module({
    imports: [],
    controllers: [],
    providers: [CryptoService],
    exports: [CryptoService],
})
export class CryptoModule { }
