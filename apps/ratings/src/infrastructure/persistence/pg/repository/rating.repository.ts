import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgRatingEntity, { PgRatingField } from '@infrastructure/persistence/pg/entities/rating.entity'


interface RatingRepositoryPort {
  addRating(payload: object): Promise<number | null>
  findRatingList(): Promise<any[]>
}


@Injectable()
export class PgRatingRepository implements RatingRepositoryPort {

  private readonly ratingAlias = 'ratings'
  private readonly logger = new Logger(PgRatingRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addRating(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.ratingAlias}
         (rating_id, ride_id, stars_by_passenger, stars_by_driver, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgRating: PgRatingEntity = plainToInstance(PgRatingEntity, payload)
    const values: PgRatingField[] = pgRating.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findRatingList(): Promise<any[]> {
    const queryText
      = `SELECT rating_id, ride_id, stars_by_passenger, stars_by_driver, created_at, updated_at, deleted_at 
         FROM ${this.ratingAlias}`

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText)
    const pgRatings: PgRatingEntity[] = plainToInstance(PgRatingEntity, result.rows)

    return result.rows
  }

}
