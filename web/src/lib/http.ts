import envConfig from '@/config/env.config';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import { useSession } from 'next-auth/react';

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
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

export const getAccessToken = async (): Promise<string> => {
  try {
    if (typeof window !== 'undefined') {
      // Client
      const { data: session } = useSession();
      return session?.accessToken || '';
    } else {
      // Server
      const { getServerSession } = await import('next-auth');
      const { authOptions } = await import(
        '@/app/api/auth/[...nextauth]/route'
      );
      const session = await getServerSession(authOptions);
      3;
      return session?.accessToken || '';
    }
  } catch (e) {
    console.error('Get access token failed');
    return '';
  }
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: await getAccessToken(),
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
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE)
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    else {
      throw new HttpError(data);
    }
  }

  // if (typeof window === 'undefined')
  //   if (['api/v1/auth/login'].some((path) => path === normalizePath(url))) {
  //     const data = (payload as ResponseApi<LoginRes>).data;
  //     clientAccessToken.value = data.accessToken;
  //     clientRefreshToken.value = data.refreshToken;
  //   } else if ('/api/v1/auth/logout' === normalizePath(url)) {
  //     clientAccessToken.value = '';
  //     clientRefreshToken.value = '';
  //   }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('GET', url, options);
  },
  post<Response>(url: string, body: any, options?: CustomOptions | undefined) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: CustomOptions | undefined) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: CustomOptions | undefined,
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
};

export default http;
