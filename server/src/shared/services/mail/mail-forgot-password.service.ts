import { EmailForgotPassword } from '@emails/forget-password';
import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '@shared/services/mail/mail.service';
import { MailForgotPassword } from '@shared/types/mail.type';

@Injectable()
export class MailForgotPasswordService extends MailService<MailForgotPassword> {
  async send(data: MailForgotPassword) {
    const emailHtml = await this.loadTemplate(EmailForgotPassword, {
      validationCode: data.validationCode,
      name: data.name,
    });

    await this.sendWithTemplate({
      to: data.to,
      subject: 'Forgot password',
      template: emailHtml,
    });
  }
}
