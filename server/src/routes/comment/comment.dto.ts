import { createZodDto } from 'nestjs-zod';
import {
  CommentResponseSchema,
  CommentSchema,
  CommentUpdateSchema,
  GetCommentSchema,
} from '@route/comment/comment.schema';

export class CreateCommentDto extends createZodDto(CommentSchema) {}
export class CommentUpdateDto extends createZodDto(CommentUpdateSchema) {}
export class CommentResponseDto extends createZodDto(CommentResponseSchema){}
export class GetCommentDto extends createZodDto(GetCommentSchema) {}