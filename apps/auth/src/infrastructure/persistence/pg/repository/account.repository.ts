import { Inject, Injectable, Logger } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { Pool, QueryResult } from 'pg'
import { plainToInstance } from 'class-transformer'
import PgAccountEntity, { PgAccountField } from '@infrastructure/persistence/pg/entities/account.entity'
import { Account } from '@core/domain/entities/account.entity'
import { Nullable } from '@libs/common/types/nullable'
import AccountEntityMapper from '@infrastructure/persistence/pg/entity-mappers/account.mapper'


export interface AccountRepositoryPort {
  addAccount(payload: Account): Promise<Account>
  findAccount(by: { phoneNumber: string }): Promise<Nullable<Account>>
}


@Injectable()
export class PgAccountRepository implements AccountRepositoryPort {

  private readonly accountAlias = 'accounts'
  private readonly logger = new Logger(PgAccountRepository.name)

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addAccount(payload: Account): Promise<Account> {
    const queryText
      = `INSERT INTO ${this.accountAlias}
         (account_id, phone_number, email, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6)`

    const pgAccount: PgAccountEntity = AccountEntityMapper.toPgEntity(payload)
    const values: PgAccountField[] = pgAccount.getValues()

    this.logger.log(queryText, values)
    const response: QueryResult = await this.pool.query(queryText, values)

    return payload
  }

  public async findAccount(by: { phoneNumber: string }): Promise<Nullable<Account>> {
    const values = []
    const whereConditions: string[] = []

    let queryText
      = `SELECT account_id, phone_number, email, created_at, updated_at, deleted_at
         FROM ${this.accountAlias}`

    if (by.phoneNumber) {
      whereConditions.push(`phone_number = $${values.length + 1}`)
      values.push(by.phoneNumber)
    }

    if (whereConditions.length) {
      queryText = `${queryText} WHERE ${whereConditions.join(' AND ')}`
    }

    this.logger.log(queryText)
    const result: QueryResult = await this.pool.query(queryText, values)
    const pgAccounts: PgAccountEntity[] = plainToInstance(PgAccountEntity, result.rows)
    const accounts: Account[] = AccountEntityMapper.toDomainEntities(pgAccounts)

    return accounts?.[0] || null
  }

}
