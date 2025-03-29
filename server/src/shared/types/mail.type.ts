export type BaseMail = {
  to: string;
  subject: string;
};

export type Mail = BaseMail & {
  html: string;
  text?: string;
};

export type MailWithTemplate = BaseMail & {
  template: string;
};

export type MailRegister = {
  to: string;
  name: string;
  validationCode: string;
};

export type MailForgotPassword = MailRegister;
