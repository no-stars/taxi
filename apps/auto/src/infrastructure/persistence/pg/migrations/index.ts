import { pool } from '@infrastructure/persistence/migrations.config'

import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'

import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'
import * as TableRelations from '@infrastructure/persistence/pg/migrations/table-relations'


const initTableMigrations: Migration[] = [
  new InitTable.CarModelInit(pool),
  new InitTable.CarInit(pool),
  new InitTable.PriceSegmentRequirementInit(pool),
  new InitTable.CarDriverInit(pool),
]

const tableIndexesMigrations: Migration[] = [
  new TableIndexes.CarDriverIndexes(pool),
  new TableIndexes.PriceSegmentRequirementIndexes(pool),
  new TableIndexes.CarModelIndexes(pool),
]

const tableRelationsMigrations: Migration[] = [
  new TableRelations.CarRelations(pool),
  new TableRelations.PriceSegmentRequirementRelations(pool),
  new TableRelations.CarDriverRelations(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
  ...tableIndexesMigrations,
  ...tableRelationsMigrations,
]


const runner = new MigrationRunner(migrations)
runner.runStandalone()
