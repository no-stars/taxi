import { Module } from '@nestjs/common'

import { AutoController } from '@application/controllers/auto.controller'
import { PgCarRepository } from '@infrastructure/persistence/pg/repository/car.repository'
import { PgCarModelRepository } from '@infrastructure/persistence/pg/repository/car-model.repository'
import { PgCarDriverRepository } from '@infrastructure/persistence/pg/repository/car-driver.repository'
import {
  PgPriceSegmentRequirementRepository,
} from '@infrastructure/persistence/pg/repository/price-segment-requirement.repository'


@Module({
  imports: [
  ],
  providers: [
    PgCarRepository,
    PgCarModelRepository,
    PgCarDriverRepository,
    PgPriceSegmentRequirementRepository,
  ],
  controllers: [
    AutoController,
  ],
})
export class AutoModule {}
