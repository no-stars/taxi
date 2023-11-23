import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgDriverActivityEntity, { PgDriverActivityField } from '@infrastructure/persistence/pg/entities/pg-driver-activity.entity'
import { PgCarModelField } from '../../../../../../auto/src/infrastructure/persistence/pg/entities/pg-car-model.entity'


interface DriverActivityRepositoryPort {
  addDriverActivity(payload: object): Promise<number | null>
  findDriverActivityList(by: { driverId: string }): Promise<any[]>
}


@Injectable()
export class PgDriverActivityRepositoryAdapter implements DriverActivityRepositoryPort {

  private readonly driverActivityAlias = 'driver_activities'
  private readonly logger = new Logger(PgDriverActivityRepositoryAdapter.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addDriverActivity(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.driverActivityAlias}
         (driver_activity_id, driver_id, car_id, status, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgDriverActivity: PgDriverActivityEntity = plainToInstance(PgDriverActivityEntity, payload)
    const values: PgDriverActivityField[] = pgDriverActivity.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findDriverActivityList(by: { driverId: string }): Promise<any[]> {
    const values: PgDriverActivityField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT da.driver_activity_id, da.driver_id, da.car_id, da.status, da.created_at, da.updated_at, da.deleted_at
         FROM ${this.driverActivityAlias} da`

    if (by.driverId) {
      whereConditions.push(`da.driver_id = $${values.length + 1}`)
      values.push(by.driverId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgDriverActivity: PgDriverActivityEntity[] = plainToInstance(PgDriverActivityEntity, result.rows)

    return result.rows
  }

}
