import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'

config({ path: '/Users/mac/Documents/projects/taxi/apps/gateway/local.env' })

const configService = new ConfigService()
const cfg = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  logging: true,
  synchronize: false,
  entities: ['apps/gateway/src/infrastructure/persistent/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['apps/gateway/src/infrastructure/persistent/typeorm/migrations/*{.ts,.js}'],
}
export const connectionSource = new DataSource(cfg as DataSourceOptions)
