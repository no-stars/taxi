import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Environment, TypeormDatabaseType } from '@core/common/constants'
import { apiServerConfig, DatabaseVariables } from '@infrastructure/config'
import { ENTITIES } from '@infrastructure/typeorm/entities'

const envFilePath = process.env.NODE_ENV === Environment.PRODUCTION
  ? './apps/gateway/.env'
  : './apps/gateway/local.env'

const DB_LOGGING_ENABLED = process.env.NODE_ENV === Environment.DEVELOPMENT



// noinspection TypeScriptValidateJSTypes
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiServerConfig],
      envFilePath,
    }),
    LoggerModule.forRoot(
      {
        pinoHttp: {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss',
              singleLine: true,
            },
          },
        },
      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<DatabaseVariables>) => ({
        type: configService.get<TypeormDatabaseType>('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [`${TypeOrmDirectory}/entities/*{.ts,.js}`],
        synchronize: true,
        logging: DB_LOGGING_ENABLED,
      }),
    }),
  ],
})
export class InfrastructureModule {}
