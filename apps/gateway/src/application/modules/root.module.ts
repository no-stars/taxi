import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import MicroservicesModule from '@infrastructure/microservices/microservices.module'
import { AuthModule } from '@application/modules/auth.module'


@Module({
  imports: [
    InfrastructureModule,
    MicroservicesModule,
    AuthModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
