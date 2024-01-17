import { Environment } from '@libs/common/constants'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DatabaseVariables } from '@infrastructure/config'
import { ENTITIES } from '@infrastructure/persistence/typeorm/entities'


const DB_LOGGING_ENABLED = process.env.NODE_ENV === Environment.DEVELOPMENT


export const typeormModuleFactory = async (
  configService: ConfigService<DatabaseVariables>
): Promise<TypeOrmModuleOptions> => {
  return {
    type: configService.get<'postgres'>('DB_TYPE'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    entities: ENTITIES,
    synchronize: true,
    logging: DB_LOGGING_ENABLED,
  }
}
