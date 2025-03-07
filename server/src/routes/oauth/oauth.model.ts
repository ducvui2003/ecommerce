export type GoogleInfo = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export type UserOauth2 = {
  name: string;
  email: string;
  avatar?: string | undefined;
};
