import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgWithdrawCardEntity, {
  PgWithdrawCardField,
} from '@infrastructure/persistence/pg/entities/withdraw-card.entity'


interface PgWithdrawCardRepositoryPort {
  addWithdrawCard(payload: object): Promise<number | null>
  findWithdrawCardList(by: { accountId: string }): Promise<any[]>
}


@Injectable()
export class PgWithdrawCardRepository implements PgWithdrawCardRepositoryPort {

  private readonly withdrawCardAlias = 'withdraw_cards'
  private readonly logger = new Logger(PgWithdrawCardRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addWithdrawCard(payload: object): Promise<number | null> {
    const queryText
      = `INSERT INTO ${this.withdrawCardAlias}
         (withdraw_card_id, account_id, card_type, card_number, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const pgWithdrawCard: PgWithdrawCardEntity = plainToInstance(PgWithdrawCardEntity, payload)
    const values: PgWithdrawCardField[] = pgWithdrawCard.getValues()

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)

    return result.rowCount
  }

  public async findWithdrawCardList(by: { accountId: string }): Promise<any[]> {
    const values: PgWithdrawCardField[] = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT wc.withdraw_card_id, wc.account_id, wc.card_type, wc.card_number, 
         wc.created_at, wc.updated_at, wc.deleted_at 
         FROM ${this.withdrawCardAlias} wc`

    if (by.accountId) {
      whereConditions.push(`wc.account_id = $${values.length + 1}`)
      values.push(by.accountId)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText, values)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgWithdrawCards: PgWithdrawCardEntity[] = plainToInstance(PgWithdrawCardEntity, result.rows)

    return result.rows
  }

}
