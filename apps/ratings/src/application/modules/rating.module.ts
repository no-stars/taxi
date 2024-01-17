import { Module } from '@nestjs/common'

import { PgRatingRepository } from '@infrastructure/persistence/pg/repository/rating.repository'


@Module({
  imports: [
  ],
  providers: [
    PgRatingRepository,
  ],
  controllers: [
  ],
})
export class RatingModule {}
