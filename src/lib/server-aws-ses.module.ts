import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { ServerAwsSesConfig } from './classes/server-aws-ses-config.class';
import { moduleFactory } from '@onivoro/server-common';
import { SES } from 'aws-sdk';

@Module({})
export class ServerAwsSesModule {
  static configure(config: ServerAwsSesConfig, apiVersion?: string) {
    return moduleFactory({
      module: ServerAwsSesModule,
      providers: [
        {
          provide: EmailService,
          useFactory: () => new EmailService(
            config,
            new SES({
              apiVersion: apiVersion || '2010-12-01',
              region: config.AWS_REGION,
              credentials: {
                accessKeyId: config.AWS_ACCESS_KEY_ID,
                secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
              }
            })
          )
        }
      ]
    });
  }
}
