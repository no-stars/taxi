import { pool } from '@infrastructure/persistence/migrations.config'
import { OrderSeed } from '@infrastructure/persistence/pg/seeders/order.seed'


const seeders = [
  new OrderSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
