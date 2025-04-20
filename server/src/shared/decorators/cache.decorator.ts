import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { CacheService } from '@shared/services/cache/cache.service';

export function CacheCheck(
  cacheService: CacheService,
  keyPrefix: string,
  ttl: number = 3600,
) {
  return function (
    target: any, //
    propertyKey: string, // name method decorated
    descriptor: PropertyDescriptor, // function
  ) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor.value);
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // ...args: array contain all input of method decorated
      const cacheKey = `${keyPrefix}:${JSON.stringify(args)}`;

      if (!cacheService || !(cacheService instanceof CacheService)) {
        throw new Error(
          'CacheService is not available. Ensure it is injected.',
        );
      }

      const cachedData = await cacheService.get(cacheKey);
      const result = await originalMethod.apply(this, args);
      cacheService.set(cacheKey, result, ttl);
      return cachedData;
    };

    return descriptor;
  };
}

export const CacheKey = createParamDecorator(
  (field: unknown, ctx: ExecutionContext) => {
    console.log('field', field);
    console.log('ctx', ctx);
  },
);
