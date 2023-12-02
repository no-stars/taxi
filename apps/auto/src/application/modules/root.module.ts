import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { AutoModule } from '@application/modules/auto.module'


@Module({
  imports: [
    InfrastructureModule,
    AutoModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
