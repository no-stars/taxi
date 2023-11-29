import { pool } from '@infrastructure/persistence/migrations.config'

import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'

import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'


const initTableMigrations: Migration[] = [
  new InitTable.RatingInit(pool),
]

const tableIndexesMigrations: Migration[] = [
  new TableIndexes.RatingIndexes(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
  ...tableIndexesMigrations,
]


MigrationRunner.run(migrations)
