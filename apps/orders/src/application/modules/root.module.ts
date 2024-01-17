import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { OrdersModule } from '@application/modules/orders.module'


@Module({
  imports: [
    InfrastructureModule,
    OrdersModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
