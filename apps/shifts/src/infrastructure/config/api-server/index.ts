import { registerAs } from '@nestjs/config'
import { ApiServerVariables } from '@infrastructure/config/api-server/api-server.interface'
import { ApiServerConfig } from '@infrastructure/config/api-server/api-server.config'
import { ConfigValidator } from '@infrastructure/config/config-validator'
export { ApiServerVariables } from '@infrastructure/config/api-server/api-server.interface'


export default registerAs('api-server', (): ApiServerVariables => {
  const validator = new ConfigValidator<ApiServerConfig>(process.env, ApiServerConfig)
  const config: ApiServerVariables = validator.getValidConfig()

  return config
})
