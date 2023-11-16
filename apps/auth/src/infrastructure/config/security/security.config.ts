import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'
import { SecurityVariables } from '@infrastructure/config/security/security.interface'


export class SecurityConfig implements SecurityVariables {

  @Expose()
  @IsString()
  JWT_SECRET: string

}
