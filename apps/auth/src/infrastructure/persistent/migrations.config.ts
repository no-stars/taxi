import { config } from 'dotenv'
import { ConfigService } from '@nestjs/config'
import { Pool } from 'pg'


config({ path: '/Users/mac/Documents/projects/taxi/apps/auth/local.env' })

const configService = new ConfigService()

export const pool = new Pool({
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  user: configService.get('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
})
