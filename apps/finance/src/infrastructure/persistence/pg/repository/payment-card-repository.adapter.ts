import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgPaymentCardEntity, { PgPaymentCardField } from '@infrastructure/persistence/pg/entities/pg-payment-card.entity'


interface PgPaymentCardRepositoryPort {
  addPaymentCard(payload: object): Promise<number | null>
  findPaymentCardList(by: { accountId: string }): Promise<any[]>
}


@Injectable()
export class PgPaymentCardRepositoryAdapter implements PgPaymentCardRepositoryPort {

  private readonly paymentCardsAlias = 'payment_cards'
  private readonly logger = new Logger(PgPaymentCardRepositoryAdapter.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addPaymentCard(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.paymentCardsAlias}
         (payment_card_id, account_id, card_type, expire_at, card_number, cvv, holder_name,
         created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

    const pgPaymentCard: PgPaymentCardEntity = plainToInstance(PgPaymentCardEntity, payload)
    const values: PgPaymentCardField[] = pgPaymentCard.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findPaymentCardList(by: { accountId: string }): Promise<any[]> {
    const values: PgPaymentCardField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT pc.payment_card_id, pc.account_id, pc.card_type, pc.expire_at, pc.card_number, pc.cvv, pc.holder_name,
         pc.created_at, pc.updated_at, pc.deleted_at 
         FROM ${this.paymentCardsAlias} pc`

    if (by.accountId) {
      whereConditions.push(`pc.account_id = $${values.length + 1}`)
      values.push(by.accountId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgPaymentCards: PgPaymentCardEntity[] = plainToInstance(PgPaymentCardEntity, result.rows)

    return result.rows
  }

}
