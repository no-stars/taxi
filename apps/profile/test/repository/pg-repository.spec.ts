import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PgPassengerRepositoryAdapter } from '@infrastructure/persistence/pg/repository/passenger-repository.adapter'
import { PgPersonRepositoryAdapter } from '@infrastructure/persistence/pg/repository/person-repository.adapter'
import { PgDriverRepositoryAdapter } from '@infrastructure/persistence/pg/repository/driver-repository.adapter'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import {
  PassengerInit,
  SavedAddressInit,
  PersonInit,
  DriverInit,
} from '@infrastructure/persistence/pg/migrations/init-tables'
import {
  SavedAddressRelations,
  PassengerRelations,
  DriverRelations,
} from '@infrastructure/persistence/pg/migrations/table-relations'
import { StringUtils } from '@libs/common/utils'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let passengerRepo: PgPassengerRepositoryAdapter
  let personRepo: PgPersonRepositoryAdapter
  let driverRepo: PgDriverRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const profileMigrations = [
      new PassengerInit(pool),
      new SavedAddressInit(pool),
      new PersonInit(pool),
      new DriverInit(pool),
      new SavedAddressRelations(pool),
      new PassengerRelations(pool),
      new DriverRelations(pool),
    ]

    for (const profileMigration of profileMigrations) {
      await profileMigration.up()
    }

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
        PgPassengerRepositoryAdapter,
        PgPersonRepositoryAdapter,
        PgDriverRepositoryAdapter,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    passengerRepo = module.get(PgPassengerRepositoryAdapter)
    personRepo = module.get(PgPersonRepositoryAdapter)
    driverRepo = module.get(PgDriverRepositoryAdapter)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and return passenger with corresponding person', async () => {
    const person = {
      person_id: StringUtils.uuid(),
      account_id: StringUtils.uuid(),
      first_name: 'Asd',
      last_name: 'Zxc',
      middle_name: 'Qwe',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const passenger = {
      passenger_id: StringUtils.uuid(),
      person_id: person.person_id,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await personRepo.addPerson(person)
    await passengerRepo.addPassenger(passenger)

    // const person = await personRepo.findRatingList()
    // const passenger = await passengerRepo.findRatingList()
    // expect(ratings).toEqual([rating1, rating2])
  })
})
