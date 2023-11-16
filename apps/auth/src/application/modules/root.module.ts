import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { AuthModule } from '@application/modules/auth.module'


@Module({
  imports: [
    AuthModule,
    InfrastructureModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
