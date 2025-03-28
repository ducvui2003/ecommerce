// <namespace>:<entity>:<id>:<attribute>

const NAMESPACE_REFRESH_TOKEN = 'refresh_token:user';

export function keyRefreshToken(userId: number | string, jti: string): string {
  return `${NAMESPACE_REFRESH_TOKEN}:${userId}:${jti}`;
}
