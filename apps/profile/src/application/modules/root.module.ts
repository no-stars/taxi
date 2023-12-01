import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import { ProfileModule } from '@application/modules/profile.module'


@Module({
  imports: [
    InfrastructureModule,
    ProfileModule,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule {}
