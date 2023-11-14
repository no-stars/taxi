import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import MicroservicesModule from '@infrastructure/microservices/microservices.module'


@Module({
  imports: [
    InfrastructureModule,
    MicroservicesModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
