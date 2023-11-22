import { pool } from '@infrastructure/persistence/migrations.config'
import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'
import * as TableRelations from '@infrastructure/persistence/pg/migrations/table-relations'


enum MigrationAction {
  up = 'up',
  down = 'down',
}

const initTableMigrations: MigrationInterface[] = [
  new InitTable.CarModelInit(pool),
  new InitTable.CarInit(pool),
  new InitTable.PriceSegmentRequirementInit(pool),
  new InitTable.CarDriverInit(pool),
]

const tableIndexesMigrations: MigrationInterface[] = [
  new TableIndexes.CarDriverIndexes(pool),
  new TableIndexes.PriceSegmentRequirementIndexes(pool),
  new TableIndexes.CarModelIndexes(pool),
]

const tableRelationsMigrations: MigrationInterface[] = [
  new TableRelations.CarRelations(pool),
  new TableRelations.PriceSegmentRequirementRelations(pool),
  new TableRelations.CarDriverRelations(pool),
]


const migrations: MigrationInterface[] = [
  ...initTableMigrations,
  ...tableIndexesMigrations,
  ...tableRelationsMigrations,
]


async function up() {
  console.log('Start migrations')

  for (const migration of migrations) {
    await migration.up()
  }

  console.log('Finish migrations')
}


async function down() {
  console.log('Undo migrations')

  for (const migration of migrations.reverse()) {
    await migration.down()
  }

  console.log('Undo migrations')
}


async function main() {
  const actionArg: string | undefined = process.argv[2]

  if (actionArg === MigrationAction.up) {
    await up()
  } else if (actionArg === MigrationAction.down) {
    await down()
  } else {
    console.log('up/down argument required')
    process.exit(2)
  }
}

main()
