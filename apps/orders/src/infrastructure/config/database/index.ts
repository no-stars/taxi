import { registerAs } from '@nestjs/config'
import { DatabaseVariables } from './database.interface'
import { DatabaseConfig } from './database.config'
import { ConfigValidator } from '../config-validator'
export { DatabaseVariables } from './database.interface'

export default registerAs('database', (): DatabaseVariables => {
  const validator = new ConfigValidator<DatabaseConfig>(process.env, DatabaseConfig)
  const config: DatabaseVariables = validator.getValidConfig()

  return config
})
