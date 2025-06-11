import { createZodDto } from 'nestjs-zod';
import { CreateContactSchema } from '@route/contact/contact.schema';

export class CreateContactDto extends createZodDto(CreateContactSchema) {}

export class ContactResponseDto {
    id: number;
    name: string;
    email: string;
    title: string;
    phone: string;
    message: string;
    status: string;
    createdAt: Date;
}
