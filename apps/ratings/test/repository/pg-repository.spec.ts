import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PgRatingRepository } from '@infrastructure/persistence/pg/repository/rating.repository'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { RatingInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { StringUtils } from '../../../../libs/common/src/utils'
import { Migration } from '@libs/common/interfaces'
import MigrationRunner from '@libs/common/utils/migration-runner'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let ratingRepo: PgRatingRepository

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const migrations: Migration[] = [
      new RatingInit(pool),
    ]

    await MigrationRunner.up(migrations)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgRatingRepository,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    ratingRepo = module.get(PgRatingRepository)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and return multiple ratings', async () => {
    const rating1 = {
      rating_id: StringUtils.uuid(),
      ride_id: StringUtils.uuid(),
      stars_by_passenger: null,
      stars_by_driver: 4,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const rating2 = {
      rating_id: StringUtils.uuid(),
      ride_id: StringUtils.uuid(),
      stars_by_passenger: 5,
      stars_by_driver: null,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await ratingRepo.addRating(rating1)
    await ratingRepo.addRating(rating2)

    const ratings = await ratingRepo.findRatingList()
    expect(ratings).toEqual([rating1, rating2])
  })
})
