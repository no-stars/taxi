import { ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-ioredis-yet'
import { RedisVariables } from '@infrastructure/config/redis'


export const redisCacheManagerFactory = (
  configService: ConfigService<RedisVariables>
) => {
  return {
    isGlobal: true,
    store: redisStore,
    port: configService.get('REDIS_PORT'),
    host: configService.get('REDIS_HOST'),
    username: configService.get('REDIS_USER'),
    password: configService.get('REDIS_PASS'),
  }
}
