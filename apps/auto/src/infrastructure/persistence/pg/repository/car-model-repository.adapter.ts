import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgCarModelEntity, { PgCarModelField } from '@infrastructure/persistence/pg/entities/pg-car-model.entity'
import PgCarEntity, { PgCarField } from '@infrastructure/persistence/pg/entities/pg-car.entity'

interface CarModelRepositoryPort {
  addCarModel(payload: object): Promise<number | null>
  findCarModel(by: { brandId: string }): Promise<any>
}


@Injectable()
export class PgCarModelRepositoryAdapter implements CarModelRepositoryPort {

  private readonly carModelAlias = 'car_models'
  private readonly logger = new Logger(PgCarModelRepositoryAdapter.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addCarModel(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.carModelAlias}
         (car_model_id, car_brand, model_name, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6)`

    const pgCarModel: PgCarModelEntity = plainToInstance(PgCarModelEntity, payload)
    const values: PgCarModelField[] = pgCarModel.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findCarModel(by: { brandId: string }): Promise<any> {
    const values: PgCarModelField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT cm.car_model_id, cm.car_brand, cm.model_name, cm.created_at, cm.updated_at, cm.deleted_at
         FROM ${this.carModelAlias} cm`

    if (by.brandId) {
      whereConditions.push(`cm.car_brand = $${values.length + 1}`)
      values.push(by.brandId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgCarModel: PgCarModelEntity[] = plainToInstance(PgCarModelEntity, result.rows)

    return pgCarModel?.[0] || null
  }

}
