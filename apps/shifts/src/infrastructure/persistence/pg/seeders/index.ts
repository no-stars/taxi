import { pool } from '@infrastructure/persistence/migrations.config'
import { ShiftTypeSeed } from '@infrastructure/persistence/pg/seeders/shift-type.seed'


const seeders = [
  new ShiftTypeSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
