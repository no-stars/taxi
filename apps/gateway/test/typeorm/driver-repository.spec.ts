import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { TypeOrmDriverRepositoryAdapter } from '@infrastructure/typeorm/repository/driver-repository.adapter'
import { TestingModule } from '@nestjs/testing/testing-module'


describe('Driver Repository', () => {
  jest.setTimeout(60000)

  let postgresContainer: StartedPostgreSqlContainer
  let repo: TypeOrmDriverRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmDriverRepositoryAdapter,
      ],
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          url: postgresContainer.getConnectionUri(),
          database: 'test',
          entities: [],
        }),
      ],
    }).compile()

    repo = module.get(TypeOrmDriverRepositoryAdapter)
  })

  // afterAll(async () => {
  //   await postgresClient.end()
  //   await postgresContainer.stop()
  // })
  //
  // it('should create and return multiple customers', async () => {
  //   const customer1 = { id: 1,
  //     name: 'John Doe' }
  //   const customer2 = { id: 2,
  //     name: 'Jane Doe' }
  //
  //   await createCustomer(postgresClient, customer1)
  //   await createCustomer(postgresClient, customer2)
  //
  //   const customers = await getCustomers(postgresClient)
  //   expect(customers).toEqual([customer1, customer2])
  // })

  it('shoud', () => {
    expect(true).toBeTruthy()
  })
})

// import { Client } from 'pg'
// import { PostgreSqlContainer } from '@testcontainers/postgresql'
// import { TypeOrmDriverRepositoryAdapter } from '@infrastructure/typeorm/repository/driver-repository.adapter.ts'


// describe('Driver Repository', () => {
//   jest.setTimeout(60000)
//
//   let postgresContainer
//   let postgresClient
//
//   beforeAll(async () => {
//     postgresContainer = await new PostgreSqlContainer().start()
//     console.log(postgresContainer.getConnectionUri())
//     console.log('asd')
//     // postgresClient = new Client({ connectionString:  })
//     // await postgresClient.connect()
//     // await createCustomerTable(postgresClient)
//   })
//
//   afterAll(async () => {
//     await postgresClient.end()
//     await postgresContainer.stop()
//   })
//
//   it('should create and return multiple customers', async () => {
//     const customer1 = { id: 1,
//       name: 'John Doe' }
//     const customer2 = { id: 2,
//       name: 'Jane Doe' }
//
//     await createCustomer(postgresClient, customer1)
//     await createCustomer(postgresClient, customer2)
//
//     const customers = await getCustomers(postgresClient)
//     expect(customers).toEqual([customer1, customer2])
//   })
// })
