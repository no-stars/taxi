import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { FinanceModule } from '@application/modules/finance.module'


@Module({
  imports: [
    InfrastructureModule,
    FinanceModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
