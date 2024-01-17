import { Module } from '@nestjs/common'

import { PgOrderRepository } from '@infrastructure/persistence/pg/repository/order.repository'
import { PgRideRepository } from '@infrastructure/persistence/pg/repository/ride.repository'
import { PgPriceProposeRepository } from '@infrastructure/persistence/pg/repository/price-propose.repository'


@Module({
  imports: [
  ],
  providers: [
    PgOrderRepository,
    PgRideRepository,
    PgPriceProposeRepository,
  ],
  controllers: [
  ],
})
export class OrdersModule {}
