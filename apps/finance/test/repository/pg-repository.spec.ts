import { startOfDay } from 'date-fns'

import { RootModule } from '@application/modules/root.module'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { PaymentInit, WithdrawCardInit, PaymentCardInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { PgPaymentCardRepository } from '@infrastructure/persistence/pg/repository/payment-card.repository'
import { PgWithdrawCardRepository } from '@infrastructure/persistence/pg/repository/withdraw-card.repository'
import { PgPaymentRepository } from '@infrastructure/persistence/pg/repository/payment.repository'

import { StringUtils } from '@libs/common/utils'
import { TestServer } from '@libs/testing/server/test-server'
import { Account } from '../../../auth/src/core/domain/entities/account.entity'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let paymentCardRepo: PgPaymentCardRepository
  let withdrawCardRepo: PgWithdrawCardRepository
  let paymentRepo: PgPaymentRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [
        PaymentInit, WithdrawCardInit, PaymentCardInit,
      ],
    })

    paymentCardRepo = testServer.testingModule.get(PgPaymentCardRepository)
    withdrawCardRepo = testServer.testingModule.get(PgWithdrawCardRepository)
    paymentRepo = testServer.testingModule.get(PgPaymentRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and then find multiple payment cards', async () => {
    // given
    const accountId: string = StringUtils.uuid()
    const actualPaymentCard1 = createPaymentCard('1234123412341234', accountId)
    const actualPaymentCard2 = createPaymentCard('2345234523452345', accountId)

    await paymentCardRepo.addPaymentCard(actualPaymentCard1)
    await paymentCardRepo.addPaymentCard(actualPaymentCard2)

    // when
    const expectedPaymentCards = await paymentCardRepo.findPaymentCardList({ accountId: accountId })
    const expectedDate = startOfDay(new Date())
    actualPaymentCard1.expire_at = expectedDate
    actualPaymentCard2.expire_at = expectedDate

    // then
    expect([actualPaymentCard1, actualPaymentCard2]).toEqual(expectedPaymentCards)
  })

  it('should create and then find multiple withdraw cards', async () => {
    // given
    const accountId: string = StringUtils.uuid()
    const actualWithdrawCard1 = createWithdrawCard('3456123412341234', accountId)
    const actualWithdrawCard2 = createWithdrawCard('5678123456781234', accountId)

    await withdrawCardRepo.addWithdrawCard(actualWithdrawCard1)
    await withdrawCardRepo.addWithdrawCard(actualWithdrawCard2)

    // when
    const expectedWithdrawCards = await withdrawCardRepo.findWithdrawCardList({ accountId: accountId })

    // then
    expect([actualWithdrawCard1, actualWithdrawCard2]).toEqual(expectedWithdrawCards)
  })

  it('should create payment', async () => {
    // given
    const payment = createPayment()

    // when
    const insertedRows = await paymentRepo.addPayment(payment)

    // then
    expect(insertedRows).toBe(1)
  })
})


function createPayment(): any {
  return {
    payment_id: StringUtils.uuid(),
    price: 600,
    payment_type: 'non_cash',
    receipt_url: 'http://payment.system.com/receipt/1234567887654321',
    status: 'pending',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createPaymentCard(cardNumber: string, accountId: string): any {
  return {
    payment_card_id: StringUtils.uuid(),
    account_id: accountId,
    card_type: 'MasterCard',
    expire_at: new Date(),
    card_number: cardNumber,
    cvv: '222',
    holder_name: 'Cvb Asd',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createWithdrawCard(cardNumber: string, accountId: string): any {
  return {
    withdraw_card_id: StringUtils.uuid(),
    account_id: accountId,
    card_type: 'Visa',
    card_number: cardNumber,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}
