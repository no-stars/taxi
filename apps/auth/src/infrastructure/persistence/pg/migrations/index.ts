import { pool } from '@infrastructure/persistence/migrations.config'
import { Migration } from '@libs/common/interfaces'
import MigrationRunner from '@libs/common/utils/migration-runner'
import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'


const initTableMigrations: Migration[] = [
  new InitTable.AccountInit(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
]


MigrationRunner.run(migrations)
