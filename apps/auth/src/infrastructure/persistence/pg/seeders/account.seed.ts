import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import { PgAccountRepository } from '@infrastructure/persistence/pg/repository/account.repository'
import { StringUtils, ArrayUtils } from '@libs/common/utils'
import { Account } from '@core/domain/entities/account.entity'
import { SEED_COUNT } from '@libs/common/constants'
import { Seed } from '@libs/common/interfaces'


export class AccountSeed implements Seed {

  private readonly accountRepo: PgAccountRepository
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.accountRepo = new PgAccountRepository(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('AccountSeed start')

    for (const item of ArrayUtils.range(SEED_COUNT.accounts)) {
      const accountData = AccountSeed.generateAccountData()

      const account: Account = Account.new(accountData)
      try {
        await this.accountRepo.addAccount(account)
      } catch (err) {
        this.errors.push(err)
      }
    }

    console.log('AccountSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private static generateAccountData(): any {
    return {
      accountId: StringUtils.uuid(),
      phoneNumber: faker.phone.number('79#########'),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    }
  }

}
