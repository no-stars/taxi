import { Module } from '@nestjs/common'
import { apiServerConfig } from '@infrastructure/config/index'
import { Environment } from '@core/common/constants'
import { ConfigModule as NestConfigModule } from '@nestjs/config'


const envFilePath = process.env.NODE_ENV === Environment.PRODUCTION
  ? './apps/gateway/.env'
  : './apps/gateway/local.env'


@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [apiServerConfig],
    }),
  ],
})
export default class ConfigModule {}
