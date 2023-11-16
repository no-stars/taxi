import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { pgProviderFactory, PG_CONNECTION } from '@infrastructure/persistent/database.config'


const postgresqlProvider = {
  provide: PG_CONNECTION,
  inject: [ConfigService],
  useFactory: pgProviderFactory,
}


@Global()
@Module({
  providers: [postgresqlProvider],
  exports: [postgresqlProvider],
})
export default class DatabaseModule {}
