import { pool } from '@infrastructure/persistence/migrations.config'
import { ShiftSeed } from '@infrastructure/persistence/pg/seeders/shift.seed'


const seeders = [
  new ShiftSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
