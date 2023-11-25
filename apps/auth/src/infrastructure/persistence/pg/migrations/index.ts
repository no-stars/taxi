import { pool } from '@infrastructure/persistence/migrations.config'
import { Migration } from '@libs/common/interfaces'
import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'


enum MigrationAction {
  up = 'up',
  down = 'down',
}

const initTableMigrations: Migration[] = [
  new InitTable.AccountInit(pool),
]

const migrations: Migration[] = [
  ...initTableMigrations,
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
