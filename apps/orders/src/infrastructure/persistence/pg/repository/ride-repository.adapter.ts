import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgRideEntity, { PgRideField } from '@infrastructure/persistence/pg/entities/pg-ride.entity'


interface RideRepositoryPort {
  addRide(payload: object): Promise<number | null>
  findRideList(by: { driverId: string }): Promise<any>
  updateRide(rideId: string, payload: object): Promise<any>
}


@Injectable()
export class PgRideRepositoryAdapter implements RideRepositoryPort {

  private readonly rideAlias = 'rides'
  private readonly logger = new Logger(PgRideRepositoryAdapter.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addRide(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.rideAlias}
         (ride_id, start_time, pick_up_time, finish_time,
         driver_id, car_id, payment_id, status, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`

    const pgRide: PgRideEntity = plainToInstance(PgRideEntity, payload)
    const values: PgRideField[] = pgRide.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findRideList(by: { driverId: string }): Promise<any> {
    const values: PgRideField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT r.ride_id, r.start_time, r.pick_up_time, r.finish_time,
         r.driver_id, r.car_id, r.payment_id, r.status, r.created_at, r.updated_at, r.deleted_at
         FROM ${this.rideAlias} r`

    if (by.driverId) {
      whereConditions.push(`r.driver_id = $${values.length + 1}`)
      values.push(by.driverId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    // ORDER BY start_time DESC
    // LIMIT 20

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgRides: PgRideEntity[] = plainToInstance(PgRideEntity, result.rows)

    return pgRides
  }

  public async updateRide(rideId: string, payload: object): Promise<any> {
    const queryText
      = `UPDATE ${this.rideAlias}
         SET start_time = $2, pick_up_time = $3, finish_time = $4, driver_id = $5,
         car_id = $6, payment_id = $7, status = $8, created_at = $9, updated_at = $10, deleted_at = $11
         WHERE ride_id = $1;`

    const pgRide: PgRideEntity = plainToInstance(PgRideEntity, payload)
    const values: PgRideField[] = [rideId, ...pgRide.getValues().slice(1)]

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgRides: PgRideEntity[] = plainToInstance(PgRideEntity, result.rows)

    return pgRides?.[0] || null
  }

}
