import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgSavedAddressEntity, { PgSavedAddressField } from '@infrastructure/persistence/pg/entities/pg-saved-address.entity'


interface SavedAddressRepositoryPort {
  addSavedAddress(payload: object): Promise<number | null>
  findSavedAddressList(by: { passengerId?: string }): Promise<any>
}


@Injectable()
export class PgSavedAddressRepository implements SavedAddressRepositoryPort {

  private readonly savedAddressAlias = 'saved_addresses'
  private readonly logger = new Logger(PgSavedAddressRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addSavedAddress(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.savedAddressAlias}
         (saved_address_id, address_name, passenger_id, coordinates, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgSavedAddress: PgSavedAddressEntity = plainToInstance(PgSavedAddressEntity, payload)
    const values: PgSavedAddressField[] = pgSavedAddress.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findSavedAddressList(by: { passengerId?: string }): Promise<any> {
    const values: PgSavedAddressField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT address_name, coordinates
         FROM ${this.savedAddressAlias}`

    if (by.passengerId) {
      whereConditions.push(`passenger_id = $${values.length + 1}`)
      values.push(by.passengerId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgSavedAddressList: PgSavedAddressEntity[] = plainToInstance(PgSavedAddressEntity, result.rows)

    return pgSavedAddressList
  }

}
