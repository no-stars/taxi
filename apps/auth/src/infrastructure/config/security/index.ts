import { registerAs } from '@nestjs/config'
import { SecurityVariables } from '@infrastructure/config/security/security.interface'
import { SecurityConfig } from '@infrastructure/config/security/security.config'
import { ConfigValidator } from '@infrastructure/config/config-validator'

export default registerAs('security', (): SecurityVariables => {
  const validator = new ConfigValidator<SecurityConfig>(process.env, SecurityConfig)
  const config: SecurityVariables = validator.getValidConfig()

  return config
})
