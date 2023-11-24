import { registerAs } from '@nestjs/config'
import { DatabaseVariables } from '@infrastructure/config/database/database.interface'
import { DatabaseConfig } from '@infrastructure/config/database/database.config'
import { ConfigValidator } from '@infrastructure/config/config-validator'
export { DatabaseVariables } from '@infrastructure/config/database/database.interface'

export default registerAs('database', (): DatabaseVariables => {
  const validator = new ConfigValidator<DatabaseConfig>(process.env, DatabaseConfig)
  const config: DatabaseVariables = validator.getValidConfig()

  return config
})
