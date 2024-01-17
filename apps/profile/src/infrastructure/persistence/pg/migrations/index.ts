import { pool } from '@infrastructure/persistence/migrations.config'

import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'

import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'
import * as TableRelations from '@infrastructure/persistence/pg/migrations/table-relations'


const initTableMigrations: Migration[] = [
  new InitTable.PassengerInit(pool),
  new InitTable.SavedAddressInit(pool),
  new InitTable.PersonInit(pool),
  new InitTable.DriverInit(pool),
]

const tableIndexesMigrations: Migration[] = [
  new TableIndexes.PersonIndexes(pool),
  new TableIndexes.PassengerIndexes(pool),
  new TableIndexes.SavedAddressIndexes(pool),
  new TableIndexes.DriverIndexes(pool),
]

const tableRelationsMigrations: Migration[] = [
  new TableRelations.SavedAddressRelations(pool),
  new TableRelations.PassengerRelations(pool),
  new TableRelations.DriverRelations(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
  ...tableIndexesMigrations,
  ...tableRelationsMigrations,
]


const runner = new MigrationRunner(migrations)
runner.runStandalone()
