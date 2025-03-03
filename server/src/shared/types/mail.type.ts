export type Mail = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type MailWithTemplate = Omit<Mail, 'html' | 'text'> & {
  template: string;
};

export type MailRegister = Pick<Mail, 'to'> & {
  name: string;
  validationCode: string;
};
