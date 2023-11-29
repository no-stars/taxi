import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgShiftEntity, { PgShiftField } from '@infrastructure/persistence/pg/entities/shift.entity'


interface ShiftRepositoryPort {
  addShift(payload: object): Promise<number | null>
  findShiftList(by: { day: Date }): Promise<any[]>
}


@Injectable()
export class PgShiftRepository implements ShiftRepositoryPort {

  private readonly shiftAlias = 'shifts'
  private readonly logger = new Logger(PgShiftRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addShift(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.shiftAlias}
         (shift_id, driver_id, shift_type_id, payment_id, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgShift: PgShiftEntity = plainToInstance(PgShiftEntity, payload)
    const values: PgShiftField[] = pgShift.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findShiftList(by: { day: Date }): Promise<any[]> {
    const values: PgShiftField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT s.shift_id, s.driver_id, s.shift_type_id, s.payment_id, s.created_at, s.updated_at, s.deleted_at
         FROM ${this.shiftAlias} s
         LEFT JOIN shift_types st ON s.shift_type_id = st.shift_type_id`

    if (by.day) {
      whereConditions.push(
        `s.created_at BETWEEN $${values.length + 1} AND $${values.length + 1} + INTERVAL '1 day - 1 sec'`
      )
      values.push(by.day)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgShifts: PgShiftEntity[] = plainToInstance(PgShiftEntity, result.rows)

    return result.rows
  }

}
