export type Response = {
  statusCode: number;
  message: string;
  data?: any;
  timestamp: Date;
};
export type ResponseError = {
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: Date;
  path?: string;
};

export type ResponseValidationError = Omit<ResponseError, 'error'> & {
  error: ValidationError[];
};

export type ValidationError = {
  field: string;
  error: string;
};
