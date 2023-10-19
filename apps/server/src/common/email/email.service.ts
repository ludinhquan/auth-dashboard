import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

type TEmailPayload = {
  to: string;
  subject: string;
  text: string;
};

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('SMTP_USERNAME'),
        pass: configService.get('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  async send(payload: TEmailPayload) {
    try {
      const result = await this.nodemailerTransport.sendMail({
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      });
      console.log('SendEmailResult', result);
    } catch (e) {
      console.log(e);
    }
  }
}
