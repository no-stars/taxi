import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPriceProposeEntity, {
  PgPriceProposeField,
} from '@infrastructure/persistence/pg/entities/pg-price-propose.entity'


interface PriceProposeRepositoryPort {
  addPricePropose(payload: object): Promise<number | null>
  findPriceProposeList(by: { orderId?: string, driverId?: string }): Promise<any>
  updatePricePropose(priceProposeId: string, payload: object): Promise<any>
}


@Injectable()
export class PgPriceProposeRepository implements PriceProposeRepositoryPort {

  private readonly priceProposeAlias = 'price_proposes'
  private readonly logger = new Logger(PgPriceProposeRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addPricePropose(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.priceProposeAlias}
         (price_propose_id, order_id, driver_id, propose_type,
         proposed_price, result, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`

    const pgPricePropose: PgPriceProposeEntity = plainToInstance(PgPriceProposeEntity, payload)
    const values: PgPriceProposeField[] = pgPricePropose.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findPriceProposeList(by: { orderId?: string, driverId?: string }): Promise<any> {
    const values: PgPriceProposeField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT pp.price_propose_id, pp.order_id, pp.driver_id, pp.propose_type,
         pp.proposed_price, pp.result, pp.created_at, pp.updated_at, pp.deleted_at
         FROM ${this.priceProposeAlias} pp`

    if (by.orderId) {
      whereConditions.push(`pp.order_id = $${values.length + 1}`)
      values.push(by.orderId)
    }

    if (by.driverId) {
      whereConditions.push(`pp.driver_id = $${values.length + 1}`)
      values.push(by.driverId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgPriceProposes: PgPriceProposeEntity[] = plainToInstance(PgPriceProposeEntity, result.rows)

    return pgPriceProposes
  }

  public async updatePricePropose(priceProposeId: string, payload: object): Promise<any> {
    const queryText
      = `UPDATE ${this.priceProposeAlias}
         SET order_id = $2, driver_id = $3, propose_type = $4,
         proposed_price = $5, result = $6, created_at = $7, updated_at = $8, deleted_at = $9
         WHERE price_propose_id = $1;`

    const pgPricePropose: PgPriceProposeEntity = plainToInstance(PgPriceProposeEntity, payload)
    const values: PgPriceProposeField[] = [priceProposeId, ...pgPricePropose.getValues().slice(1)]

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgPriceProposes: PgPriceProposeEntity[] = plainToInstance(PgPriceProposeEntity, result.rows)

    return pgPriceProposes?.[0] || null
  }

}
