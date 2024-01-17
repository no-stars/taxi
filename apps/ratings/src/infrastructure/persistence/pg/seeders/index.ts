import { pool } from '@infrastructure/persistence/migrations.config'
import { RatingSeed } from '@infrastructure/persistence/pg/seeders/rating.seed'


const seeders = [
  new RatingSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
