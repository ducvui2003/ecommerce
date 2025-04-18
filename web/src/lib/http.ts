import envConfig from '@/config/env.config';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import { Session } from 'next-auth';

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload?: any }) {
    super('HTTP Error');
    this.status = status;
    this.payload = payload;
  }
}

type EntityErrorPayload = {
  message: string;
  error: { field: string; error: string }[];
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
  try {
    if (typeof window !== 'undefined') {
      // Client
      // const session = await getSession();
      // return session?.accessToken || '';
      const res = await fetch('/api/auth/session');
      const session: Session = await res.json();
      return session?.accessToken || '';
    } else {
      // Server
      const { getServerSession } = await import('next-auth');
      const { default: authOptions } = await import('@/config/auth.config');
      const session = await getServerSession(authOptions);
      return session?.accessToken || '';
    }
  } catch (e) {
    console.error('Get access token failed', e);
    return '';
  }
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
    Authorization: auth ? await getAccessToken() : '',
  };
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_SERVER_URL
      : options?.baseUrl;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url} `
    : `${baseUrl}/${url}`;

  let res;
  if (typeof window !== 'undefined')
    res = await logging(fullUrl, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      },
      body,
      method,
    });
  else
    res = await fetch(fullUrl, {
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

const logging = async (url: string, options: RequestInit) => {
  // Log request details

  if (envConfig.NEXT_PUBLIC_LOG_CLIENT)
    console.log('Request:', {
      method: options.method,
      url,
      headers: options.headers,
      body: options.body,
    });

  try {
    const response = await fetch(url, options);

    // Check if the response is not successful (non-2xx status)
    if (!response.ok) {
      // Read the response body to get any error details
      const errorBody = await response.text();

      // Create a custom error object with all relevant details
      const error = new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`,
      );
      (error as any).status = response.status;
      (error as any).statusText = response.statusText;
      (error as any).body = errorBody;

      throw error; // Throw error to be caught in catch block
    }
    const clonedResponse = response.clone();
    // Parse and return the JSON response if successful
    const data = await response.json();

    if (envConfig.NEXT_PUBLIC_LOG_CLIENT) console.log('Response Data:', data);

    return clonedResponse;
  } catch (error: any) {
    // Catch network errors, HTTP errors, or any errors thrown above
    if (envConfig.NEXT_PUBLIC_LOG_CLIENT)
      console.error('Error during request:', {
        message: error.message,
        status: error.status || 'N/A',
        statusText: error.statusText || 'N/A',
        body: error.body || 'N/A',
      });

    throw error; // Rethrow the error for further handling
  }
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
