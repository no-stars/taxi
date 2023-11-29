import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPaymentEntity, { PgPaymentField } from '@infrastructure/persistence/pg/entities/payment.entity'

interface PgPaymentRepositoryPort {
  addPayment(payload: object): Promise<number | null>
}


@Injectable()
export class PgPaymentRepository implements PgPaymentRepositoryPort {

  private readonly paymentAlias = 'payments'
  private readonly logger = new Logger(PgPaymentRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addPayment(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.paymentAlias}
         (payment_id, price, payment_type, receipt_url, status, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

    const pgPayment: PgPaymentEntity = plainToInstance(PgPaymentEntity, payload)
    const values: PgPaymentField[] = pgPayment.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

}
