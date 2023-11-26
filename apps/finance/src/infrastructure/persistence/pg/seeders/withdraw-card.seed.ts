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

  constructor(private readonly pool: Pool) {
    this.withdrawCardRepo = new PgWithdrawCardRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('WithdrawCardSeed start')

    for (const item of ArrayUtils.range(SEED_COUNT.withdrawCards)) {
      const withdrawCardData = WithdrawCardSeed.generateWithdrawCardData()
      await this.withdrawCardRepo.addWithdrawCard(withdrawCardData)
    }

    console.log('WithdrawCardSeed finished')
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
