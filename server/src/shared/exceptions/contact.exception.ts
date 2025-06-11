import { AppException } from '@shared/app.error';
import { ContactErrorMessage } from '@shared/constants/error.constant';

export class ContactValueInvalid extends AppException {
  constructor() {
    super(ContactErrorMessage.CONTACT_INVALID, 400, 1001);
  }
}
