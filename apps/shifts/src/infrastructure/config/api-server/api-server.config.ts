import { Expose } from 'class-transformer'
import { IsEnum, IsPort } from 'class-validator'
import { Environment } from '@libs/common/constants'
import { ApiServerVariables } from '@infrastructure/config/api-server/api-server.interface'

export class ApiServerConfig implements ApiServerVariables {

  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment

  @Expose({ name: 'APP_PORT' })
  @IsPort()
  PORT: string

  // get isAuthEnabled(): string {
  //   return this.PORT
  // }

}
