import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { promises as fs } from 'fs';
import * as path from 'path';

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

  async sendHtmlEmail({
    html,
    subject,
    to,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to,
      subject,
      html,
    });
  }

  async readEmailTemplate(templateName: string) {
    const templatePath = path.resolve(
      __dirname,
      '../common/templates',
      `${templateName}.html`,
    );

    const template = await fs.readFile(templatePath, 'utf-8');

    return template;
  }
}
