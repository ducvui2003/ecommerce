type Session = {
  user: UserSession;
  accessToken: string;
  refreshToken: string;
  expiresAt: number; //second
};
type UserSession = {
  id: number;
  email: string;
  name?: string;
  avatar?: string | undefined;
  role: string;
};
export type { Session, UserSession };
