import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import {ContactResponseDto, CreateContactDto} from './contact.dto';
import { ContactValueInvalid } from '@shared/exceptions/contact.exception';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  createContact(createContactDto: CreateContactDto) : Promise<ContactResponseDto> {
    try {
      const contact = this.contactRepository.createContact(createContactDto);
      return contact;
    } catch (error) {
      throw new ContactValueInvalid();
    }
  }
}
