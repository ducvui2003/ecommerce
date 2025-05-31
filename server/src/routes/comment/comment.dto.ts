import { createZodDto } from 'nestjs-zod';
import { CommentSchema } from '@route/comment/comment.schema';

export class CreateCommentDto extends createZodDto(CommentSchema) {}
