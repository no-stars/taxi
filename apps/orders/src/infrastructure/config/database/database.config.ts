import { Expose } from 'class-transformer'
import { IsPort, IsString } from 'class-validator'
import { TypeormDatabaseType } from '@core/common/constants'
import { DatabaseVariables } from './database.interface'


export class DatabaseConfig implements DatabaseVariables {

  @Expose()
  DB_TYPE: TypeormDatabaseType

  @Expose()
  @IsString()
  DB_HOST: string

  @Expose()
  @IsPort()
  DB_PORT: string

  @Expose()
  @IsString()
  DB_USER: string

  @Expose()
  @IsString()
  DB_PASS: string

  @Expose()
  @IsString()
  DB_NAME: string

}
