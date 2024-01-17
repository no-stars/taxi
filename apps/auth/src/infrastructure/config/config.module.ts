import { Module } from '@nestjs/common'
import { apiServerConfig } from '@infrastructure/config/index'
import { Environment } from '@libs/common/constants'
import { ConfigModule as NestConfigModule } from '@nestjs/config'


const serviceName = process.env.SERVICE_NAME
const envFilePath = process.env.NODE_ENV === Environment.PRODUCTION
  ? `./apps/${serviceName}/.env`
  : `./apps/${serviceName}/local.env`

console.log(serviceName, envFilePath)


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
