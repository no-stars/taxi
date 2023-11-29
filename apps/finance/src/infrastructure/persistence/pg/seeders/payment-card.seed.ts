import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import {
  PgPaymentCardRepository,
} from '@infrastructure/persistence/pg/repository/payment-card.repository'
import { StringUtils, ArrayUtils } from '@libs/common/utils'
import { SEED_COUNT } from '@libs/common/constants'
import { Seed } from '@libs/common/interfaces'
import { startOfMonth } from 'date-fns'


const ALLOWED_CARD_TYPES: string[] = ['Visa', 'MIR']


export class PaymentCardSeed implements Seed {

  private readonly paymentCardRepo: PgPaymentCardRepository
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.paymentCardRepo = new PgPaymentCardRepository(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('PaymentCard start')

    for (const item of ArrayUtils.range(SEED_COUNT.paymentCards)) {
      const paymentCardData = PaymentCardSeed.generatePaymentCardData()
      try {
        await this.paymentCardRepo.addPaymentCard(paymentCardData)
      } catch (err) {
        this.errors.push(err)
      }
    }

    console.log('PaymentCard finished')
    console.log(`errors: ${this.errors}`)
  }

  private static generatePaymentCardData(): any {
    const cardType: string = ArrayUtils.randomChoice(ALLOWED_CARD_TYPES)
    const expireAt: Date = startOfMonth(faker.date.future({ years: 3 }))

    return {
      payment_card_id: StringUtils.uuid(),
      account_id: StringUtils.uuid(),
      card_type: cardType,
      expire_at: expireAt,
      card_number: faker.finance.creditCardNumber({ issuer: '4###-####-####-###L' }),
      cvv: faker.finance.creditCardCVV(),
      holder_name: faker.person.fullName(),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}
