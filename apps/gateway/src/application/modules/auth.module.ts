import { Module } from '@nestjs/common'

import { AuthController } from '@application/controllers/auth.controller'
import MicroservicesModule from '@infrastructure/microservices/microservices.module'


@Module({
  imports: [
    MicroservicesModule,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
