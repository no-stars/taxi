import { Expose } from 'class-transformer'
import { IsPort, IsString } from 'class-validator'
import { RedisVariables } from '@infrastructure/config/redis/redis.interface'


export class RedisConfig implements RedisVariables {

  @Expose()
  @IsString()
  REDIS_HOST: string

  @Expose()
  @IsPort()
  REDIS_PORT: string

  @Expose()
  @IsString()
  REDIS_USER: string

  @Expose()
  @IsString()
  REDIS_PASS: string

}
