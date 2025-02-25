import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { IsPasswordStrong } from 'src/shared/decorators/strong-password';

export class RegisterReqDTO {
  @IsEmail()
  email: string;
  name: string;
  @MinLength(1, { message: 'Password is required' })
  @IsPasswordStrong({
    message:
      'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.',
  })
  password: string;
}

export class RegisterResDTO {
  id: number;
  email: string;
  name?: string | null;
  @Exclude() password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial);
  }
}

export class LoginReqDTO {
  @IsEmail()
  email: string;
  @MinLength(1, { message: 'Password is required' })
  password: string;
}

export class LoginResDTO {
  id: number;
  email: string;
  image?: string | undefined;
  accessToken: string;
  refreshToken: string;
  exp: number;

  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial);
  }
}

export class RefreshReqDTO {
  refreshToken: string;
}

export class RefreshResDTO {
  accessToken: string;
  refreshToken: string;
  exp: number;

  constructor(partial: Partial<RefreshResDTO>) {
    Object.assign(this, partial);
  }
}

export class LogoutReqDTO extends RefreshResDTO {}
