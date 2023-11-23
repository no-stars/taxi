import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { PaymentInit, WithdrawCardInit, PaymentCardInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { PgPaymentCardRepositoryAdapter } from '@infrastructure/persistence/pg/repository/payment-card-repository.adapter'
import { PgWithdrawCardRepositoryAdapter } from '@infrastructure/persistence/pg/repository/withdraw-card-repository.adapter'
import { PgPaymentRepositoryAdapter } from '@infrastructure/persistence/pg/repository/payment-repository.adapter'
import { StringUtils } from '@libs/common/utils'
import { startOfDay } from 'date-fns'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let paymentCardRepo: PgPaymentCardRepositoryAdapter
  let withdrawCardRepo: PgWithdrawCardRepositoryAdapter
  let paymentRepo: PgPaymentRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const financeMigrations = [
      new PaymentInit(pool),
      new WithdrawCardInit(pool),
      new PaymentCardInit(pool),
    ]

    for (const migration of financeMigrations) {
      await migration.up()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgPaymentCardRepositoryAdapter,
        PgWithdrawCardRepositoryAdapter,
        PgPaymentRepositoryAdapter,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    paymentCardRepo = module.get(PgPaymentCardRepositoryAdapter)
    withdrawCardRepo = module.get(PgWithdrawCardRepositoryAdapter)
    paymentRepo = module.get(PgPaymentRepositoryAdapter)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and then find multiple payment cards', async () => {
    const paymentCard1 = {
      payment_card_id: StringUtils.uuid(),
      account_id: StringUtils.uuid(),
      card_type: 'Visa',
      expire_at: new Date(),
      card_number: '1234123412341234',
      cvv: '111',
      holder_name: 'Asd Zxc',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const paymentCard2 = {
      payment_card_id: StringUtils.uuid(),
      account_id: paymentCard1.account_id,
      card_type: 'MasterCard',
      expire_at: new Date(),
      card_number: '2345234523452345',
      cvv: '222',
      holder_name: 'Cvb Asd',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await paymentCardRepo.addPaymentCard(paymentCard1)
    await paymentCardRepo.addPaymentCard(paymentCard2)

    const foundPaymentCards = await paymentCardRepo.findPaymentCardList({ accountId: paymentCard1.account_id })
    const expectedDate = startOfDay(new Date())
    paymentCard1.expire_at = expectedDate
    paymentCard2.expire_at = expectedDate
    expect(foundPaymentCards).toEqual([paymentCard1, paymentCard2])
  })

  it('should create and then find multiple withdraw cards', async () => {
    const withdrawCard1 = {
      withdraw_card_id: StringUtils.uuid(),
      account_id: StringUtils.uuid(),
      card_type: 'Visa',
      card_number: '3456123412341234',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const withdrawCard2 = {
      withdraw_card_id: StringUtils.uuid(),
      account_id: withdrawCard1.account_id,
      card_type: 'Visa',
      card_number: '5678123456781234',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await withdrawCardRepo.addWithdrawCard(withdrawCard1)
    await withdrawCardRepo.addWithdrawCard(withdrawCard2)

    const foundWithdrawCards = await withdrawCardRepo.findWithdrawCardList({ accountId: withdrawCard1.account_id })
    expect(foundWithdrawCards).toEqual([withdrawCard1, withdrawCard2])
  })

  it('should create payment', async () => {
    const payment = {
      payment_id: StringUtils.uuid(),
      price: 600,
      payment_type: 'non-cash',
      receipt_url: 'http://payment.system.com/receipt/1234567887654321',
      status: 'pending',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    const insertedRows = await paymentRepo.addPayment(payment)
    expect(insertedRows).toBe(1)
  })
})
