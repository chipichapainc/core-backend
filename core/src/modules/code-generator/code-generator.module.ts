import { Module } from '@nestjs/common';
import { TicketsCodeGeneratorProvider } from './code-generator.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    TicketsCodeGeneratorProvider
  ],
  exports: [
    TicketsCodeGeneratorProvider
  ],
})
export class CodeGeneratorModule {}
