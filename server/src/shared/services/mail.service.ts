import envConfig from '@config/env.config';
import { EmailVerify } from '@emails/register-verify';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { render } from '@react-email/components';
import { MailRegister, MailWithTemplate } from '@shared/types/mail.type';
import * as nodemailer from 'nodemailer';
import React from 'react';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: envConfig.EMAIL_HOST,
    port: envConfig.EMAIL_PORT,
    service: 'gmail',
    secure: false,
    auth: {
      user: envConfig.EMAIL_USER,
      pass: envConfig.EMAIL_PASSWORD,
    },
  });

  async sendWithTemplate(data: MailWithTemplate) {
    await this.transporter.sendMail({
      from: envConfig.EMAIL_USER,
      to: data.to,
      subject: data.subject,
      html: data.template,
    });
    Logger.log(`Mail sent to ${data.to}`);
  }

  async loadTemplate(template, data): Promise<string> {
    return await render(React.createElement(template, data));
  }

  @OnEvent('email.register')
  async sendRegisterTemplate(data: MailRegister) {
    const emailHtml = await this.loadTemplate(EmailVerify, {
      validationCode: data.validationCode,
      name: data.name,
    });

    await this.sendWithTemplate({
      to: data.to,
      subject: 'Register Verification',
      template: emailHtml,
    });
    Logger.log('Send email success');
  }
}
