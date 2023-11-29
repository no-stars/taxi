import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPersonEntity, { PgPersonField } from '@infrastructure/persistence/pg/entities/pg-person.entity'


interface PersonRepositoryPort {
  addPerson(payload: object): Promise<number | null>
  findPerson(by: { passengerId?: string, driverId?: string }): Promise<any>
  findProfile(by: { accountId: string }): Promise<any>
}


@Injectable()
export class PgPersonRepository implements PersonRepositoryPort {

  private readonly personAlias = 'persons'
  private readonly logger = new Logger(PgPersonRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addPerson(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.personAlias}
         (person_id, account_id, first_name, last_name, middle_name, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

    const pgPerson: PgPersonEntity = plainToInstance(PgPersonEntity, payload)
    const values: PgPersonField[] = pgPerson.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findPerson(by: { passengerId?: string, driverId?: string }): Promise<any> {
    const values: PgPersonField[] = []
    const whereConditions: string[] = []
    const joinConditions: string[] = []

    let queryText
      = `SELECT pe.person_id, pe.account_id, pe.first_name, pe.last_name, pe.middle_name, pe.created_at, pe.updated_at, pe.deleted_at
         FROM ${this.personAlias} pe`

    if (by.passengerId) {
      joinConditions.push('JOIN passengers pa ON pe.person_id = pa.person_id')
      whereConditions.push(`pa.passenger_id = $${values.length + 1}`)
      values.push(by.passengerId)
    }

    if (by.driverId) {
      joinConditions.push('JOIN drivers dr ON pe.person_id = dr.person_id')
      whereConditions.push(`dr.driver_id = $${values.length + 1}`)
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
    const pgPerson: PgPersonEntity[] = plainToInstance(PgPersonEntity, result.rows)

    return pgPerson?.[0] || null
  }

  public async findProfile(by: { accountId: string }): Promise<any> {
    const values: PgPersonField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT pe.person_id, pa.passenger_id, dr.driver_id
         FROM ${this.personAlias} pe
         LEFT JOIN passengers pa ON pe.person_id = pa.person_id
         LEFT JOIN drivers dr ON pe.person_id = dr.person_id`

    if (by.accountId) {
      whereConditions.push(`pe.account_id = $${values.length + 1}`)
      values.push(by.accountId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgPerson: PgPersonEntity[] = plainToInstance(PgPersonEntity, result.rows)

    return pgPerson?.[0] || null
  }

}
