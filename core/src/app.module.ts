import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/typeorm-datasource';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CryptoModule } from './modules/crypto/crypto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TicketsModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
