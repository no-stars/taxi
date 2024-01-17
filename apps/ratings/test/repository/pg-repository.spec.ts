import { RootModule } from '@application/modules/root.module'

import { PgRatingRepository } from '@infrastructure/persistence/pg/repository/rating.repository'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { RatingInit } from '@infrastructure/persistence/pg/migrations/init-tables'

import { StringUtils } from '@libs/common/utils'
import { TestServer } from '@libs/testing/server/test-server'
import { Nullable } from '@libs/common/types/nullable'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let ratingRepo: PgRatingRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [
        RatingInit,
      ],
    })

    ratingRepo = testServer.testingModule.get(PgRatingRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and return multiple ratings', async () => {
    // given
    const actualRating1 = createRating(null, 4)
    const actualRating2 = createRating(5, null)
    await ratingRepo.addRating(actualRating1)
    await ratingRepo.addRating(actualRating2)

    // when
    const expectedRatings = await ratingRepo.findRatingList()

    // then
    expect([actualRating1, actualRating2]).toEqual(expectedRatings)
  })
})


function createRating(starsByPassenger: Nullable<number>, starsByDriver: Nullable<number>): any {
  return {
    rating_id: StringUtils.uuid(),
    ride_id: StringUtils.uuid(),
    stars_by_passenger: starsByPassenger,
    stars_by_driver: starsByDriver,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}
