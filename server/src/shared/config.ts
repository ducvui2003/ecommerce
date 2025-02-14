import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config({
  path: '.env',
});

if (!fs.existsSync(path.resolve('.env'))) {
  console.error('No .env file found in the root directory');
  process.exit(1);
}

class Config {
  @IsNumber()
  PORT: number;
  @IsString()
  DATABASE_URL: string;
  @IsString()
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  @IsString()
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRY: string;
  @IsString()
  SECRET_KEY: string;
}
const configServer = plainToInstance(Config, process.env, {
  enableImplicitConversion: true,
});
const e = validateSync(configServer);
if (e.length) {
  console.error('Env has conflict');
  const errors = e.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
      value: error.value,
    };
  });
  throw errors;
}

const envConfig = configServer;
export default envConfig;
