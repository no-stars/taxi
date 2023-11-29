import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPassengerEntity, { PgPassengerField } from '@infrastructure/persistence/pg/entities/pg-passenger.entity'


interface PassengerRepositoryPort {
  addPassenger(payload: object): Promise<number | null>
}


@Injectable()
export class PgPassengerRepository implements PassengerRepositoryPort {

  private readonly passengerAlias = 'passengers'
  private readonly logger = new Logger(PgPassengerRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addPassenger(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.passengerAlias}
         (passenger_id, person_id, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5)`

    const pgPassenger: PgPassengerEntity = plainToInstance(PgPassengerEntity, payload)
    const values: PgPassengerField[] = pgPassenger.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

}
