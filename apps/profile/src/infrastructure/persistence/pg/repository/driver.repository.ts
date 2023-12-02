import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgDriverEntity, { PgDriverField } from '@infrastructure/persistence/pg/entities/driver.entity'


interface DriverRepositoryPort {
  addDriver(payload: object): Promise<number | null>
}


@Injectable()
export class PgDriverRepository implements DriverRepositoryPort {

  private readonly driverAlias = 'drivers'
  private readonly logger = new Logger(PgDriverRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addDriver(payload: object): Promise<number | null> {
    // Стоит посмотреть именнованные параметры
    const queryText
      = `INSERT INTO ${this.driverAlias}
         (driver_id, person_id, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5)
         `

    // Часто используют один метод сохранения и для INSERT и для UPDATE действия
    // Реализуется это через конструкцию `UPSERT` или `ON CONFLICT (driver_id) DO UPDATE`

    const pgDriver: PgDriverEntity = plainToInstance(PgDriverEntity, payload)
    const values: PgDriverField[] = pgDriver.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

}
