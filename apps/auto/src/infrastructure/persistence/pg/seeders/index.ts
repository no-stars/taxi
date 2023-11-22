import { pool } from '@infrastructure/persistence/migrations.config'
import { AutoSeed } from '@infrastructure/persistence/pg/seeders/auto.seed'


const seeders = [
  new AutoSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
