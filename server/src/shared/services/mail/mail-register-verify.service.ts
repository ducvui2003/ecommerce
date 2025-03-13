import EmailVerify from '@emails/register-verify';
import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '@shared/services/mail/mail.service';
import { MailRegister } from '@shared/types/mail.type';

@Injectable()
export class MailRegisterService extends MailService<MailRegister> {
  async send(data: MailRegister) {
    const emailHtml = await this.loadTemplate(EmailVerify, {
      validationCode: data.validationCode,
      name: data.name,
    });

    await this.sendWithTemplate({
      to: data.to,
      subject: 'Register Verification',
      template: emailHtml,
    });
  }
}
