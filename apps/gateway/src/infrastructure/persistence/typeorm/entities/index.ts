import { TypeOrmAccount as Account } from '@infrastructure/persistence/typeorm/entities/typeorm-account.entity'
import { TypeOrmDriver as Driver } from '@infrastructure/persistence/typeorm/entities/typeorm-driver.entity'

export const ENTITIES = [Account, Driver]
