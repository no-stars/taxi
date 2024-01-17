import { RootModule } from '@application/modules/root.module'
import { Account } from '@core/domain/entities/account.entity'

import { PgAccountRepository } from '@infrastructure/persistence/pg/repository/account.repository'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { AccountInit } from '@infrastructure/persistence/pg/migrations/init-tables'

import { StringUtils } from '@libs/common/utils'
import { TestServer } from '@libs/testing/server/test-server'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let repo: PgAccountRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [AccountInit],
    })

    repo = testServer.testingModule.get(PgAccountRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and return multiple accounts', async () => {
    // given
    const actualAccount1 = createAccount('+79035487612', 'asd@hotmail.com')
    const actualAccount2 = createAccount('+79035487613', 'zxc@protonmail.com')
    await repo.addAccount(actualAccount1)
    await repo.addAccount(actualAccount2)

    // when
    const expectedAccount1 = await repo.findAccount({ phoneNumber: actualAccount1.getPhoneNumber() })
    const expectedAccount2 = await repo.findAccount({ phoneNumber: actualAccount2.getPhoneNumber() })

    // then
    expect([actualAccount1, actualAccount2]).toEqual([expectedAccount1, expectedAccount2])
  })
})


function createAccount(phoneNumber: string, email: string): Account {
  return new Account({
    account_id: StringUtils.uuid(),
    phoneNumber: phoneNumber,
    email: email,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  })
}
