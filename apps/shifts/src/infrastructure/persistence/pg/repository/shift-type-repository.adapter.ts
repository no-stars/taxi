import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgShiftTypeEntity, { PgShiftTypeField } from '@infrastructure/persistence/pg/entities/pg-shift-type.entity'


interface ShiftTypeRepositoryPort {
  addShiftType(payload: object): Promise<number | null>
  findShiftTypeList(): Promise<any[]>
}


@Injectable()
export class PgShiftTypeRepositoryAdapter implements ShiftTypeRepositoryPort {

  private readonly shiftTypeAlias = 'shift_types'
  private readonly logger = new Logger(PgShiftTypeRepositoryAdapter.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addShiftType(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.shiftTypeAlias}
         (shift_type_id, shift_name, price, working_hours, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgShiftType: PgShiftTypeEntity = plainToInstance(PgShiftTypeEntity, payload)
    const values: PgShiftTypeField[] = pgShiftType.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findShiftTypeList(): Promise<any[]> {
    const queryText
      = `SELECT shift_type_id, shift_name, price, working_hours, created_at, updated_at, deleted_at 
         FROM ${this.shiftTypeAlias}`

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText)
    const pgShiftTypes: PgShiftTypeEntity[] = plainToInstance(PgShiftTypeEntity, result.rows)

    return result.rows
  }

}
