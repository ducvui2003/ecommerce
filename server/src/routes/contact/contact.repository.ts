import { Injectable } from '@nestjs/common';
import {ContactResponseDto, CreateContactDto} from './contact.dto';
import { PrismaService } from '@shared/services/prisma.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createContact(createContactDto: CreateContactDto) {
    const contact =  await this.prismaService.contact.create({
      data: {
        name: createContactDto.name,
        email: createContactDto.email,
        message: createContactDto.message,
        title: createContactDto.title,
        phone: createContactDto.phone,
      },
    });

    return this.mapToContactResponseDto(contact);
  }

  private mapToContactResponseDto(contact): ContactResponseDto {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      title: contact.title,
      message: contact.message,
      status: contact.status,
      createdAt: contact.createdAt,
    };
  }
}
