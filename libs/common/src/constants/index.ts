import { DatabaseType } from 'typeorm'
import { SEED_COUNT } from './seed'

type TypeormDatabaseType = Exclude<DatabaseType, 'sqljs'>

const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000

enum Environment {
  TEST = 'test',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export {
  Environment,
  TypeormDatabaseType,
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
  SEED_COUNT,
}
