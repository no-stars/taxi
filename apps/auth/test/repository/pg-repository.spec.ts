import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { StringUtils } from '@libs/common/utils'
import { PgAccountRepository } from '@infrastructure/persistence/pg/repository/account.repository'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { AccountInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { Account } from '@core/domain/entities/account.entity'
import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let repo: PgAccountRepository

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const migrations: Migration[] = [
      new AccountInit(pool),
    ]

    await MigrationRunner.up(migrations)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgAccountRepository,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    repo = module.get(PgAccountRepository)
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
