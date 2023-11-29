import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgCarEntity, { PgCarField } from '@infrastructure/persistence/pg/entities/car.entity'


interface CarRepositoryPort {
  addCar(payload: object): Promise<number | null>
  findCar(by: { driverId: string }): Promise<any>
}


@Injectable()
export class PgCarRepository implements CarRepositoryPort {

  private readonly carAlias = 'cars'
  private readonly logger = new Logger(PgCarRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addCar(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.carAlias}
         (car_id, car_model_id, plate_number, release_year, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgCar: PgCarEntity = plainToInstance(PgCarEntity, payload)
    const values: PgCarField[] = pgCar.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findCar(by: { driverId: string }): Promise<any> {
    const values: PgCarField[] = []
    const whereConditions: string[] = []
    const joinConditions: string[] = []

    let queryText
      = `SELECT c.car_id, c.car_model_id, c.plate_number, c.release_year, c.created_at, c.updated_at, c.deleted_at
         FROM ${this.carAlias} c`

    if (by.driverId) {
      joinConditions.push('JOIN car_drivers cd ON c.car_id = cd.car_id')
      whereConditions.push(`cd.driver_id = $${values.length + 1}`)
      values.push(by.driverId)
    }

    if (joinConditions.length) {
      queryText = `${queryText} ${joinConditions.join(' ')}`
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgCar: PgCarEntity[] = plainToInstance(PgCarEntity, result.rows)

    return pgCar?.[0] || null
  }

}
