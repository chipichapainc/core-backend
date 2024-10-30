import { FactoryProvider, Module } from '@nestjs/common';
import { BrevoEmailsService } from './brevo.emails.service';
import { ConfigService } from '@nestjs/config';
import { SmtpEnvConfig, SMTPProviders } from 'src/configs/smtp.config';
import { EmailsService } from './emails.service';

const EmailsServiceProvider: FactoryProvider<EmailsService> = {
  provide: EmailsService,
  useFactory: (config: ConfigService<SmtpEnvConfig>) => {
    switch(config.getOrThrow("SMTP_PROVIDER")) {
        case SMTPProviders.BREVO:
            return new BrevoEmailsService(config.getOrThrow("SMTP_API_KEY"));
        default:
            throw new Error("Invalid SMTP provider")
    }
  },
  inject: [ConfigService],
};

@Module({
    imports: [],
    controllers: [],
    providers: [EmailsServiceProvider],
    exports: [EmailsService],
})
export class EmailsModule { }
