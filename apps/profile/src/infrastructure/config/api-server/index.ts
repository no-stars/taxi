import { registerAs } from '@nestjs/config'
import { ApiServerVariables } from './api-server.interface'
import { ApiServerConfig } from './api-server.config'
import { ConfigValidator } from '../config-validator'
export { ApiServerVariables } from './api-server.interface'


export default registerAs('api-server', (): ApiServerVariables => {
  const validator = new ConfigValidator<ApiServerConfig>(process.env, ApiServerConfig)
  const config: ApiServerVariables = validator.getValidConfig()

  return config
})
