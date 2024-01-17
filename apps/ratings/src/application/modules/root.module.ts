import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { RatingModule } from '@application/modules/rating.module'


@Module({
  imports: [
    InfrastructureModule,
    RatingModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
