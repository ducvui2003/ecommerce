import envConfig from '@config/env.config';
import { Injectable, Logger } from '@nestjs/common';
import { render } from '@react-email/components';
import { MailWithTemplate } from '@shared/types/mail.type';
import * as nodemailer from 'nodemailer';
import React from 'react';

export abstract class MailService<T> {
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

  protected async sendWithTemplate(data: MailWithTemplate) {
    await this.transporter.sendMail({
      from: envConfig.EMAIL_USER,
      to: data.to,
      subject: data.subject,
      html: data.template,
    });
    Logger.log(`Mail sent to ${data.to}`);
  }

  protected async loadTemplate(template, data: any): Promise<string> {
    return await render(React.createElement(template, data));
  }

  protected beforeSend(data: T) {
    Logger.log('Start send mail');
  }

  abstract send(data: T);

  protected afterSend(data: T) {
    Logger.log('Send mail success');
  }

  async handleSend(data: T) {
    this.beforeSend(data);
    await this.send(data);
    this.afterSend(data);
  }
}
