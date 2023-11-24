import { Module, Global } from '@nestjs/common'
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { redisCacheManagerFactory } from '@infrastructure/cache/cache.config'


@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: redisCacheManagerFactory,
      inject: [ConfigService],
    }),
  ],
  exports: [
    NestCacheModule,
  ],
})
export default class CacheModule {}
