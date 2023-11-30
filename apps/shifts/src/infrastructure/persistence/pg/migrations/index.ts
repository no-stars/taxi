import { pool } from '@infrastructure/persistence/migrations.config'

import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'

import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'
import * as TableRelations from '@infrastructure/persistence/pg/migrations/table-relations'


const initTableMigrations: Migration[] = [
  new InitTable.ShiftInit(pool),
  new InitTable.ShiftTypeInit(pool),
  new InitTable.DriverActivityInit(pool),
]

const tableIndexesMigrations: Migration[] = [
  new TableIndexes.ShiftIndexes(pool),
  new TableIndexes.DriverActivityIndexes(pool),
]

const tableRelationsMigrations: Migration[] = [
  new TableRelations.ShiftRelations(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
  ...tableIndexesMigrations,
  ...tableRelationsMigrations,
]


const runner = new MigrationRunner(migrations)
runner.runStandalone()
