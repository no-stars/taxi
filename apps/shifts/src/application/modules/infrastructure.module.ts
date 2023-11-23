import { Module } from '@nestjs/common'

import DatabaseModule from '@infrastructure/persistence/database.module'
import LoggerModule from '@infrastructure/logger/logger.module'
import ConfigModule from '@infrastructure/config/config.module'


@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
  ],
})
export class InfrastructureModule {}
