import {Body, Controller, HttpCode, HttpStatus, Inject, Injectable, Post} from '@nestjs/common';
import {ContactResponseDto, CreateContactDto} from './contact.dto';
import { ContactService } from '@route/contact/contact.service';

@Controller('/api/v1/contact')
export class ContactController {
  constructor(@Inject() private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createContact(
      @Body() createContactDto: CreateContactDto
  ): Promise<ContactResponseDto> {
    return await this.contactService.createContact(createContactDto);
  }

}