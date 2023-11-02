import { DatabaseType } from 'typeorm'

type TypeormDatabaseType = Exclude<DatabaseType, 'sqljs'>

enum Environment {
  TEST = 'test',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export {
  Environment,
  TypeormDatabaseType,
}
