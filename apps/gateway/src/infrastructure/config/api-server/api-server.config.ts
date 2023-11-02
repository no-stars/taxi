import { Expose } from 'class-transformer'
import { IsEnum, IsUrl } from 'class-validator'
import { Environment } from '@core/common/constants'
import { ApiServerVariables } from './api-server.interface'

export class ApiServerConfig implements ApiServerVariables {

  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment

  @Expose()
  @IsUrl()
  SERVICE_URL: string

  // get isAuthEnabled(): string {
  //   return this.PORT
  // }

}
