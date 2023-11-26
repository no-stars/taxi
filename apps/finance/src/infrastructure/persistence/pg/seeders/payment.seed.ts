import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import { PgPaymentRepositoryAdapter } from '@infrastructure/persistence/pg/repository/payment-repository.adapter'
import { StringUtils, ArrayUtils, NumberUtils } from '@libs/common/utils'
import { SEED_COUNT } from '@libs/common/constants'
import { Seed } from '@libs/common/interfaces'


const ALLOWED_PAYMENT_TYPES: string[] = ['cash', 'non_cash']
const ALLOWED_STATUSES: string[] = ['paid', 'pending']


export class PaymentSeed implements Seed {

  private readonly paymentRepo: PgPaymentRepositoryAdapter
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.paymentRepo = new PgPaymentRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('PaymentSeed start')

    for (const item of ArrayUtils.range(SEED_COUNT.payments)) {
      const paymentData = PaymentSeed.generatePaymentData()
      try {
        await this.paymentRepo.addPayment(paymentData)
      } catch (err) {
        this.errors.push(err)
      }
    }

    console.log('PaymentSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private static generatePaymentData(): any {
    const price: number = NumberUtils.randomInt(200, 700)
    const paymentType: string = ArrayUtils.randomChoice(ALLOWED_PAYMENT_TYPES)
    const status: string = ArrayUtils.randomChoice(ALLOWED_STATUSES)

    return {
      payment_id: StringUtils.uuid(),
      price,
      payment_type: paymentType,
      receipt_url: faker.image.urlLoremFlickr(),
      status,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}
