import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { StringUtils } from '../../../../libs/common/src/utils'
import { PgAccountRepositoryAdapter } from '@infrastructure/persistent/pg/repository/account-repository.adapter'
import { PG_CONNECTION } from '@infrastructure/persistent/database.config'
import { AccountInit } from '@infrastructure/persistent/pg/migrations/init-tables'
import { Account } from '@core/domain/entities/account.entity'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let repo: PgAccountRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const ratingMigrations = new AccountInit(pool)
    await ratingMigrations.up()

    await pool.end()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => new Pool({
            connectionString: postgresContainer.getConnectionUri(),
          }),
        },
        PgAccountRepositoryAdapter,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    repo = module.get(PgAccountRepositoryAdapter)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and return multiple accounts', async () => {
    const account1 = Account.new({
      account_id: StringUtils.uuid(),
      phoneNumber: '+79035487612',
      email: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    })
    const account2 = Account.new({
      id: StringUtils.uuid(),
      phoneNumber: '+79035487613',
      email: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await repo.addAccount(account1)
    await repo.addAccount(account2)

    const foundAccount1 = await repo.findAccount({ phoneNumber: '+79035487612' })
    const foundAccount2 = await repo.findAccount({ phoneNumber: '+79035487613' })
    expect([foundAccount1, foundAccount2]).toEqual([foundAccount1, foundAccount2])
  })
})
