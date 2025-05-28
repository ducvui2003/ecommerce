import image from '/public/images/product.png';

export const HOME_PAGE: string = '/';
export const LOGIN_PAGE: string = '/login';
export const HTTP_STATUS_CODE = {
  BAD_STATUS_REQUEST: 400,
  ENTITY_ERROR_STATUS_CODE: 422,
  UNAUTHORIZED: 401,
  SUCCESS: 200,
} as const;

export const LOCAL_STORAGE = {
  LOGOUT: 'logout-action',
} as const;

export const ALT = 'An Nhiem';
export const DEFAULT_IMAGE = image;
export const PAYMENT_COOKIE = 'payment';
