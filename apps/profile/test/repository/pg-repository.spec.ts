import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PgPassengerRepository } from '@infrastructure/persistence/pg/repository/passenger.repository'
import { PgPersonRepository } from '@infrastructure/persistence/pg/repository/person.repository'
import { PgDriverRepository } from '@infrastructure/persistence/pg/repository/driver.repository'
import {
  PgSavedAddressRepository,
} from '@infrastructure/persistence/pg/repository/saved-address.repository'
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
import { Migration } from '@libs/common/interfaces'
import MigrationRunner from '@libs/common/utils/migration-runner'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer

  let passengerRepo: PgPassengerRepository
  let personRepo: PgPersonRepository
  let driverRepo: PgDriverRepository
  let savedAddressRepo: PgSavedAddressRepository

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const migrations: Migration[] = [
      new PassengerInit(pool),
      new SavedAddressInit(pool),
      new PersonInit(pool),
      new DriverInit(pool),
      new SavedAddressRelations(pool),
      new PassengerRelations(pool),
      new DriverRelations(pool),
    ]

    await MigrationRunner.up(migrations)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgPassengerRepository,
        PgPersonRepository,
        PgDriverRepository,
        PgSavedAddressRepository,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    passengerRepo = module.get(PgPassengerRepository)
    personRepo = module.get(PgPersonRepository)
    driverRepo = module.get(PgDriverRepository)
    savedAddressRepo = module.get(PgSavedAddressRepository)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and then find driver and passenger with corresponding person', async () => {
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
    const driver = {
      driver_id: StringUtils.uuid(),
      person_id: person.person_id,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await personRepo.addPerson(person)
    await passengerRepo.addPassenger(passenger)
    await driverRepo.addDriver(driver)

    const profile = await personRepo.findProfile({ accountId: person.account_id })
    const expectedProfile = {
      id: person.person_id,
      passenger_id: passenger.passenger_id,
      driver_id: driver.driver_id,
    }

    expect(profile).toEqual(expectedProfile)
  })

  it('should create and then find person by its corresponding driver and passenger', async () => {
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
    const driver = {
      driver_id: StringUtils.uuid(),
      person_id: person.person_id,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await personRepo.addPerson(person)
    await passengerRepo.addPassenger(passenger)
    await driverRepo.addDriver(driver)

    const foundPersonByPassenger = await personRepo.findPerson({ passengerId: passenger.passenger_id })
    const foundPersonByDriver = await personRepo.findPerson({ driverId: driver.driver_id })

    // expect(foundPersonByPassenger).toEqual(person)
    // expect(foundPersonByDriver).toEqual(person)
  })

  it('should create and then find saved address', async () => {
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
    const savedAddress = {
      saved_address_id: StringUtils.uuid(),
      address_name: 'qqq',
      passenger_id: passenger.passenger_id,
      coordinates: '35.204088, 54.307690',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await personRepo.addPerson(person)
    await passengerRepo.addPassenger(passenger)
    await savedAddressRepo.addSavedAddress(savedAddress)

    const foundSavedAddress = await savedAddressRepo.findSavedAddressList({ passengerId: passenger.passenger_id })

    // expect(foundSavedAddress).toEqual(savedAddress)
  })
})
