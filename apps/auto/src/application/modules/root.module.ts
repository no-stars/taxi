import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'


@Module({
  imports: [
    InfrastructureModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
