import { TypeormDatabaseType } from '@core/common/constants'

export interface DatabaseVariables {
  DB_TYPE: TypeormDatabaseType
  DB_HOST: string
  DB_PORT: string
  DB_USER: string
  DB_PASS: string
  DB_NAME: string
}
