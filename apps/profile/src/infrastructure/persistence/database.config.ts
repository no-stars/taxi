import { ConfigService } from '@nestjs/config'
import { DatabaseVariables } from '@infrastructure/config'
import { Pool } from 'pg'

export const PG_CONNECTION = Symbol('PG_CONNECTION')

export const pgProviderFactory = (
  configService: ConfigService<DatabaseVariables>
) => new Pool({
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  user: configService.get('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
})
