import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/typeorm-datasource';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { EventsModule } from './modules/events/events.module';
import { CodeGeneratorModule } from './modules/code-generator/code-generator.module';
import { ConfigModule } from '@nestjs/config';
import { CONFIGS } from './configs/configs';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: CONFIGS
        }),
        CryptoModule,
        CodeGeneratorModule,

        TypeOrmModule.forRoot(dbConfig),

        TicketsModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
