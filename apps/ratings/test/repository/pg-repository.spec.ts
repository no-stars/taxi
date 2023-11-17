import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PgRatingRepositoryAdapter } from '@infrastructure/persistence/pg/repository/rating-repository.adapter'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { RatingInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { StringUtils } from '../../../../libs/common/src/utils'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let repo: PgRatingRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const ratingMigrations = new RatingInit(pool)
    await ratingMigrations.up()

    await pool.end()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => new Pool({
            connectionString: postgresContainer.getConnectionUri(),
          }),
        },
        PgRatingRepositoryAdapter,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    repo = module.get(PgRatingRepositoryAdapter)
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

    await repo.addRating(rating1)
    await repo.addRating(rating2)

    const ratings = await repo.findRatingList()
    expect(ratings).toEqual([rating1, rating2])
  })
})
