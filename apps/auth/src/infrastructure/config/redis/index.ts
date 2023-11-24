import { registerAs } from '@nestjs/config'
import { RedisConfig } from '@infrastructure/config/redis/redis.config'
import { ConfigValidator } from '@infrastructure/config/config-validator'
import { RedisVariables } from '@infrastructure/config/redis/redis.interface'

export { RedisVariables } from '@infrastructure/config/redis/redis.interface'


export default registerAs('redis', (): RedisVariables => {
  const validator = new ConfigValidator<RedisConfig>(process.env, RedisConfig)
  const config: RedisVariables = validator.getValidConfig()

  return config
})
