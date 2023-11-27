import { pool } from '@infrastructure/persistence/migrations.config'
import { ProfileSeed } from '@infrastructure/persistence/pg/seeders/profile.seed'
import { Seed } from '@libs/common/interfaces'


const seeders: Seed[] = [
  new ProfileSeed(pool),
]


async function main() {
  console.log('Start seed')

  for (const seed of seeders) {
    await seed.execute()
  }

  console.log('Finish seed')
}

main()
