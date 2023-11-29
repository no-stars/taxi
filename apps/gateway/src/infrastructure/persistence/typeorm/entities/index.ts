import { TypeOrmAccount as Account } from '@infrastructure/persistence/typeorm/entities/account.entity'
import { TypeOrmDriver as Driver } from '@infrastructure/persistence/typeorm/entities/driver.entity'

export const ENTITIES = [Account, Driver]
