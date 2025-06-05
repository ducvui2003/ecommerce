import { Module } from '@nestjs/common';
import { ContactController } from '@route/contact/contact.controller';
import {ContactService} from "@route/contact/contact.service";
import { ContactRepository } from './contact.repository';

@Module({
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
})
export class ContactModule {}