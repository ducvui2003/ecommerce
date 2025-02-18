export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export class Token {
  private token = '';
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token in server side');
    }

    this.token = token;
  }
}
