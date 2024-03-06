import { Injectable } from '@nestjs/common';
import { SES } from 'aws-sdk';
import { ServerAwsSesConfig } from '../classes/server-aws-ses-config.class';

@Injectable()
export class EmailService {
  constructor(public config: ServerAwsSesConfig, private ses: SES) { }

  async sendEmail(email: string, subject: string, html: string, text: string, Source?: string) {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
          Text: {
            Charset: 'UTF-8',
            Data: text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: this.getSource(Source),
    };

    return await this.ses.sendEmail(params).promise();
  }

  public getSource(source?: string) {
    return source || this.config.Source;
  }
}
