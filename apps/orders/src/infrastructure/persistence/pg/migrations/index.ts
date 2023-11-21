import { pool } from '@infrastructure/persistence/migrations.config'
import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import * as InitTable from '@infrastructure/persistence/pg/migrations/init-tables'
import * as TableRelations from '@infrastructure/persistence/pg/migrations/table-relations'
import * as TableIndexes from '@infrastructure/persistence/pg/migrations/table-indexes'


enum MigrationAction {
  up = 'up',
  down = 'down',
}

const initTableMigrations: MigrationInterface[] = [
  new InitTable.PassengerInit(pool),
  new InitTable.PaymentCardInit(pool),
  new InitTable.CarModelInit(pool),
  new InitTable.AccountInit(pool),
  new InitTable.SavedAddressInit(pool),
  new InitTable.PersonInit(pool),
  new InitTable.DriverInit(pool),
  new InitTable.CarInit(pool),
  new InitTable.PriceSegmentRequirementInit(pool),
  new InitTable.ShiftInit(pool),
  new InitTable.ShiftTypeInit(pool),
  new InitTable.DriverActivityInit(pool),
  new InitTable.WithdrawCardInit(pool),
  new InitTable.OrderInit(pool),
  new InitTable.PaymentInit(pool),
  new InitTable.RideInit(pool),
  new InitTable.PriceProposeInit(pool),
  new InitTable.RatingInit(pool),
  new InitTable.CarDriverInit(pool),
]

const tableRelationsMigrations: MigrationInterface[] = [
  new TableRelations.SavedAddressRelations(pool),
  new TableRelations.PassengerRelations(pool),
  new TableRelations.DriverRelations(pool),
  new TableRelations.CarRelations(pool),
  new TableRelations.PriceSegmentRequirementRelations(pool),
  new TableRelations.ShiftRelations(pool),
  new TableRelations.OrderRelations(pool),
  new TableRelations.PriceProposeRelations(pool),
  new TableRelations.CarDriverRelations(pool),
]

const tableIndexesMigrations: MigrationInterface[] = [
  new TableIndexes.PersonIndexes(pool),
  new TableIndexes.PassengerIndexes(pool),
  new TableIndexes.SavedAddressIndexes(pool),
  new TableIndexes.DriverIndexes(pool),
  new TableIndexes.CarDriverIndexes(pool),
  new TableIndexes.PriceSegmentRequirementIndexes(pool),
  new TableIndexes.ShiftIndexes(pool),
  new TableIndexes.PaymentCardIndexes(pool),
  new TableIndexes.WithdrawCardIndexes(pool),
  new TableIndexes.RideIndexes(pool),
  new TableIndexes.PriceProposeIndexes(pool),
  new TableIndexes.RatingIndexes(pool),
  new TableIndexes.OrderIndexes(pool),
  new TableIndexes.CarModelIndexes(pool),
  new TableIndexes.DriverActivityIndexes(pool),
]


const migrations: MigrationInterface[] = [
  ...initTableMigrations,
  ...tableRelationsMigrations,
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
