import { pool } from '@infrastructure/persistence/migrations.config'
import { PaymentSeed } from '@infrastructure/persistence/pg/seeders/payment.seed'
import { PaymentCardSeed } from '@infrastructure/persistence/pg/seeders/payment-card.seed'
import { WithdrawCardSeed } from '@infrastructure/persistence/pg/seeders/withdraw-card.seed'


const seeders = [
  new PaymentSeed(pool),
  new PaymentCardSeed(pool),
  new WithdrawCardSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
