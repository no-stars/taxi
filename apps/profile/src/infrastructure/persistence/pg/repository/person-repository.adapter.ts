import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPersonEntity, { PgPersonField } from '@infrastructure/persistence/pg/entities/pg-person.entity'


interface PersonRepositoryPort {
  addPerson(payload: object): Promise<number | null>
}


@Injectable()
export class PgPersonRepositoryAdapter implements PersonRepositoryPort {

  private readonly personAlias = 'persons'
  private readonly logger = new Logger(PgPersonRepositoryAdapter.name)

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

}
