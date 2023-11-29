import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPriceSegmentRequirementEntity, {
  PgPriceSegmentRequirementField,
} from '@infrastructure/persistence/pg/entities/pg-price-segment-requirement.entity'

interface PriceSegmentRequirementRepositoryPort {
  addPriceSegmentRequirement(payload: object): Promise<number | null>
}


@Injectable()
export class PgPriceSegmentRequirementRepository implements PriceSegmentRequirementRepositoryPort {

  private readonly priceSegmentRequirementAlias = 'price_segment_requirements'
  private readonly logger = new Logger(PgPriceSegmentRequirementRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addPriceSegmentRequirement(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.priceSegmentRequirementAlias}
         (price_segment_requirement_id, price_segment, car_model_id, min_year, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgPriceSegmentRequirement: PgPriceSegmentRequirementEntity = plainToInstance(
      PgPriceSegmentRequirementEntity,
      payload
    )
    const values: PgPriceSegmentRequirementField[] = pgPriceSegmentRequirement.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

}
