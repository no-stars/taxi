import { TypeOrmAccount as Account } from '@infrastructure/persistent/typeorm/entities/typeorm-account.entity'
import { TypeOrmDriver as Driver } from '@infrastructure/persistent/typeorm/entities/typeorm-driver.entity'

export const ENTITIES = [Account, Driver]
