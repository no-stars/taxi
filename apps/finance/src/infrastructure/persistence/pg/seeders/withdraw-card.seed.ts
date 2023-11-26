import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import {
  PgWithdrawCardRepositoryAdapter,
} from '@infrastructure/persistence/pg/repository/withdraw-card-repository.adapter'
import { StringUtils, ArrayUtils } from '@libs/common/utils'
import { SEED_COUNT } from '@libs/common/constants'
import { Seed } from '@libs/common/interfaces'


const ALLOWED_CARD_TYPES: string[] = ['Visa', 'Mir']


export class WithdrawCardSeed implements Seed {

  private readonly withdrawCardRepo: PgWithdrawCardRepositoryAdapter
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.withdrawCardRepo = new PgWithdrawCardRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('WithdrawCardSeed start')

    for (const item of ArrayUtils.range(SEED_COUNT.withdrawCards)) {
      const withdrawCardData = WithdrawCardSeed.generateWithdrawCardData()
      try {
        await this.withdrawCardRepo.addWithdrawCard(withdrawCardData)
      } catch (err) {
        this.errors.push(err)
      }
    }

    console.log('WithdrawCardSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private static generateWithdrawCardData(): any {
    const cardType: string = ArrayUtils.randomChoice(ALLOWED_CARD_TYPES)

    return {
      withdraw_card_id: StringUtils.uuid(),
      account_id: StringUtils.uuid(),
      card_type: cardType,
      card_number: faker.finance.creditCardNumber({ issuer: '4###-####-####-###L' }),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}
