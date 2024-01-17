import { pool } from '@infrastructure/persistence/migrations.config'
import { AccountSeed } from '@infrastructure/persistence/pg/seeders/account.seed'


const seeders = [
  new AccountSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
