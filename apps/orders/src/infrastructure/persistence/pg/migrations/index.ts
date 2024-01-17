import { pool } from '@infrastructure/persistence/migrations.config'

import { Migration } from '@libs/common/interfaces'

import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableRelations from '@infrastructure/persistence/pg/migrations/table-relations'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'
import { MigrationRunner } from '@libs/common/utils'


const initTableMigrations: Migration[] = [
  new InitTable.OrderInit(pool),
  new InitTable.RideInit(pool),
  new InitTable.PriceProposeInit(pool),
]

const tableRelationsMigrations: Migration[] = [
  new TableRelations.OrderRelations(pool),
  new TableRelations.PriceProposeRelations(pool),
]

const tableIndexesMigrations: Migration[] = [
  new TableIndexes.RideIndexes(pool),
  new TableIndexes.PriceProposeIndexes(pool),
  new TableIndexes.OrderIndexes(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
  ...tableRelationsMigrations,
  ...tableIndexesMigrations,
]


const runner = new MigrationRunner(migrations)
runner.runStandalone()
