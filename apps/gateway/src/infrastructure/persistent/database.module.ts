import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { typeormModuleFactory } from '@infrastructure/persistent/database.config'


// noinspection TypeScriptValidateJSTypes
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormModuleFactory,
    }),
  ],
})
export default class DatabaseModule {}
