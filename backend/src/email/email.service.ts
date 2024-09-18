import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendHtmlEmail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to,
      subject,
      html,
    });
  }
}
