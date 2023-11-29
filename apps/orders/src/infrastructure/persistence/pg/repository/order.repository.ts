import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgOrderEntity, { PgOrderField } from '@infrastructure/persistence/pg/entities/pg-order.entity'


interface OrderRepositoryPort {
  addOrder(payload: object): Promise<number | null>
  findOrderById(orderId: string): Promise<any>
  findOrderList(by: { passengerId: string, priceSegment: string, orderType: string }): Promise<any>
  updateOrder(orderId: string, payload: object): Promise<any>
}


@Injectable()
export class PgOrderRepository implements OrderRepositoryPort {

  private readonly orderAlias = 'orders'
  private readonly logger = new Logger(PgOrderRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addOrder(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.orderAlias}
         (order_id, ride_id, start_location, finish_location,
         passenger_id, price_segment, recommended_price, price,
         payment_type, order_type, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`

    const pgOrder: PgOrderEntity = plainToInstance(PgOrderEntity, payload)
    const values: PgOrderField[] = pgOrder.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findOrderById(orderId: string): Promise<any> {
    const queryText
      = `SELECT o.order_id, o.ride_id, o.start_location, o.finish_location,
         o.passenger_id, o.price_segment, o.recommended_price, o.price,
         o.payment_type, o.order_type, o.created_at, o.updated_at, o.deleted_at
         FROM ${this.orderAlias} o
         WHERE o.order_id = $1 AND o.deleted_at IS NULL;`

    const values: PgOrderField[] = [orderId]

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgOrder: PgOrderEntity[] = plainToInstance(PgOrderEntity, result.rows)

    return pgOrder?.[0] || null
  }

  public async findOrderList(by: { passengerId?: string, priceSegment?: string, orderType?: string }): Promise<any> {
    const values: PgOrderField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT o.order_id, o.ride_id, o.start_location, o.finish_location,
         o.passenger_id, o.price_segment, o.recommended_price, o.price,
         o.payment_type, o.order_type, o.created_at, o.updated_at, o.deleted_at
         FROM ${this.orderAlias} o`

    if (by.passengerId) {
      whereConditions.push(`o.passenger_id = $${values.length + 1}`)
      values.push(by.passengerId)
    }

    if (by.priceSegment) {
      whereConditions.push(`o.price_segment = $${values.length + 1}`)
      values.push(by.priceSegment)
    }

    if (by.orderType) {
      whereConditions.push(`o.order_type = $${values.length + 1}`)
      values.push(by.orderType)
    }

    // circle(driverLocation, 0.002) (2.22 km)
    // WHERE circle('(80.31958023992814,13.77847602742554)', 0.002) @> start_location
    // AND ride_id IS NULL

    whereConditions.push('o.deleted_at IS NULL')

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgOrders: PgOrderEntity[] = plainToInstance(PgOrderEntity, result.rows)

    return pgOrders
  }

  public async updateOrder(orderId: string, payload: object): Promise<any> {
    const queryText
      = `UPDATE ${this.orderAlias}
         SET ride_id = $2, start_location = $3, finish_location = $4,
         passenger_id = $5, price_segment = $6, recommended_price = $7, price = $8,
         payment_type = $9, order_type = $10, created_at = $11, updated_at = $12, deleted_at = $13
         WHERE order_id = $1;`

    const pgOrder: PgOrderEntity = plainToInstance(PgOrderEntity, payload)
    const values: PgOrderField[] = [orderId, ...pgOrder.getValues().slice(1)]

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgOrders: PgOrderEntity[] = plainToInstance(PgOrderEntity, result.rows)

    return pgOrders?.[0] || null
  }

}
