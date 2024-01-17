import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { ShiftModule } from '@application/modules/shift.module'


@Module({
  imports: [
    InfrastructureModule,
    ShiftModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
