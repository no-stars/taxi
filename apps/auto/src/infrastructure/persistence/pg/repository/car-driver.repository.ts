import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgCarDriverEntity, { PgCarDriverField } from '@infrastructure/persistence/pg/entities/car-driver.entity'


interface CarDriverRepositoryPort {
  addCarDriver(payload: object): Promise<number | null>
}


@Injectable()
export class PgCarDriverRepository implements CarDriverRepositoryPort {

  private readonly carDriverAlias = 'car_drivers'
  private readonly logger = new Logger(PgCarDriverRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addCarDriver(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.carDriverAlias}
         (car_driver_id, driver_id, car_id, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6)`

    const pgCarDriver: PgCarDriverEntity = plainToInstance(PgCarDriverEntity, payload)
    const values: PgCarDriverField[] = pgCarDriver.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

}
