import { Inject, Injectable } from '@nestjs/common';
import { TypeOfEmail } from '@shared/constants/email.constant';
import { MailForgotPasswordService } from '@shared/services/mail/mail-forgot-password.service';
import { MailRegisterService } from '@shared/services/mail/mail-register-verify.service';

@Injectable()
export class MailFactory {
  constructor(
    @Inject('MAIL_REGISTER')
    private readonly mailRegisterVerify: MailRegisterService,
    @Inject('MAIL_FORGOT_PASSWORD')
    private readonly mailForgotPassword: MailForgotPasswordService,
  ) {}

  getEmailService(type: TypeOfEmail) {
    switch (type) {
      case 'REGISTER':
        return this.mailRegisterVerify;
      case 'FORGOT_PASSWORD':
        return this.mailForgotPassword;
      default:
        throw new Error(`Unsupported email type: ${type as any}`);
    }
  }
}
