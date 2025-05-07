import envConfig from '@/config/env.config';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import { Session } from 'next-auth';

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

export class HttpError extends Error {
  status: number;
  payload: {
    error: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload?: any }) {
    super('HTTP Error');
    this.status = status;
    this.payload = payload;
  }
}

type EntityErrorPayload = {
  error: string;
  message: { field: string; error: string }[];
};

export class EntityError extends HttpError {
  status: number = 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: EntityErrorPayload;
  }) {
    super({ status: 422, payload });
    this.status = status;
    this.payload = payload;
  }
}

export const getAccessToken = async (): Promise<string> => {
  // try {
  //   const response = await fetch(
  //     `${envConfig.NEXT_PUBLIC_SERVER_INTERNAL}/api/auth/session`,
  //   );
  //   console.log('data', await response.json());
  //   if (typeof window !== 'undefined') {
  //     // Client
  //     // const session = await getSession();
  //     // return session?.accessToken || '';
  //     const res = await fetch('/api/auth/session');
  //     const session: Session = await res.json();
  //     return session?.user.accessToken || '';
  //   } else {
  //     // Server
  //     const { getServerSession } = await import('next-auth');
  //     const { default: authOptions } = await import('@/config/auth.config');
  //     const session = await getServerSession(authOptions);
  //     return session?.user.accessToken || '';
  //   }
  // } catch (e) {
  //   console.error('Get access token failed', e);
  //   return '';
  // }
  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_SERVER_INTERNAL}/api/auth/session`,
  );
  const body: Session = await response.json();
  if (!body?.user?.accessToken) return '';

  return body.user.accessToken;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
  auth: boolean = true,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: auth ? `Bearer ${await getAccessToken()}` : '',
  };
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_SERVER_URL
      : options?.baseUrl;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url} `
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  let data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE) {
      const payloadCasting = data.payload as EntityErrorPayload;
      throw new EntityError({
        status: HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE,
        payload: {
          message: payloadCasting.message,
          error: payloadCasting.error,
        },
      });
    } else {
      throw new HttpError(data);
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('GET', url, options, auth);
  },
  post<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('POST', url, { ...options, body }, auth);
  },
  put<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('PUT', url, { ...options, body }, auth);
  },
  delete<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
    auth: boolean = true,
  ) {
    return request<Response>('DELETE', url, { ...options, body }, auth);
  },
};

export default http;
