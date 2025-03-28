import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public set<T>(key: string, value: T, ttl?: number) {
    this.cacheManager.set(key, value, ttl);
  }

  public get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  public del(key: string) {
    return this.cacheManager.del(key);
  }

  public async exist(key: string): Promise<boolean> {
    return (await this.cacheManager.get(key)) != null;
  }
}
