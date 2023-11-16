import { pool } from '@infrastructure/persistent/migrations.config'
import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import * as InitTable from '@infrastructure/persistent/pg/migrations/init-tables'
import * as TableIndexes from '@infrastructure/persistent/pg/migrations/table-indexes'


enum MigrationAction {
  up = 'up',
  down = 'down',
}

const initTableMigrations: MigrationInterface[] = [
  new InitTable.RatingInit(pool),
]

const tableIndexesMigrations: MigrationInterface[] = [
  new TableIndexes.RatingIndexes(pool),
]


const migrations: MigrationInterface[] = [
  ...initTableMigrations,
  ...tableIndexesMigrations,
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
