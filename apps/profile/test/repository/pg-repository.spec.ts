import { RootModule } from '@application/modules/root.module'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { PgPassengerRepository } from '@infrastructure/persistence/pg/repository/passenger.repository'
import { PgPersonRepository } from '@infrastructure/persistence/pg/repository/person.repository'
import { PgDriverRepository } from '@infrastructure/persistence/pg/repository/driver.repository'
import {
  PgSavedAddressRepository,
} from '@infrastructure/persistence/pg/repository/saved-address.repository'
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
import { TestServer } from '@libs/testing/server/test-server'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let passengerRepo: PgPassengerRepository
  let personRepo: PgPersonRepository
  let driverRepo: PgDriverRepository
  let savedAddressRepo: PgSavedAddressRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [
        PassengerInit, SavedAddressInit, PersonInit, DriverInit,
        SavedAddressRelations, PassengerRelations, DriverRelations,
      ],
    })

    passengerRepo = testServer.testingModule.get(PgPassengerRepository)
    personRepo = testServer.testingModule.get(PgPersonRepository)
    driverRepo = testServer.testingModule.get(PgDriverRepository)
    savedAddressRepo = testServer.testingModule.get(PgSavedAddressRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and then find driver and passenger with corresponding person', async () => {
    // given
    const person = createPerson()
    const actualPassenger = createPassenger(person.person_id)
    const actualDriver = createDriver(person.person_id)

    await personRepo.addPerson(person)
    await passengerRepo.addPassenger(actualPassenger)
    await driverRepo.addDriver(actualDriver)

    const actualProfile = {
      id: person.person_id,
      passenger_id: actualPassenger.passenger_id,
      driver_id: actualDriver.driver_id,
    }

    // when
    const expectedProfile = await personRepo.findProfile({ accountId: person.account_id })

    // then
    expect(actualProfile).toEqual(expectedProfile)
  })

  it('should create and then find person by its corresponding driver and passenger', async () => {
    // given
    const actualPerson = createPerson()
    const passenger = createPassenger(actualPerson.person_id)
    const driver = createDriver(actualPerson.person_id)

    await personRepo.addPerson(actualPerson)
    await passengerRepo.addPassenger(passenger)
    await driverRepo.addDriver(driver)

    // when
    const expectedPersonByPassenger = await personRepo.findPerson({ passengerId: passenger.passenger_id })
    const expectedPersonByDriver = await personRepo.findPerson({ driverId: driver.driver_id })

    // then
    // expect(actualPerson).toEqual(expectedPersonByPassenger)
    // expect(actualPerson).toEqual(expectedPersonByDriver)
  })

  it('should create and then find saved address', async () => {
    // given
    const person = createPerson()
    const passenger = createPassenger(person.person_id)
    const actualSavedAddress = createSavedAddress(passenger.passenger_id)

    await personRepo.addPerson(person)
    await passengerRepo.addPassenger(passenger)
    await savedAddressRepo.addSavedAddress(actualSavedAddress)

    // when
    const expectedSavedAddress = await savedAddressRepo.findSavedAddressList({ passengerId: passenger.passenger_id })

    // then
    // expect(actualSavedAddress).toEqual(expectedSavedAddress)
  })
})


function createPerson(): any {
  return {
    person_id: StringUtils.uuid(),
    account_id: StringUtils.uuid(),
    first_name: 'Asd',
    last_name: 'Zxc',
    middle_name: 'Qwe',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createPassenger(personId: string): any {
  return {
    passenger_id: StringUtils.uuid(),
    person_id: personId,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createDriver(personId: string): any {
  return {
    driver_id: StringUtils.uuid(),
    person_id: personId,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createSavedAddress(passengerId: string): any {
  return {
    saved_address_id: StringUtils.uuid(),
    address_name: 'qqq',
    passenger_id: passengerId,
    coordinates: '35.204088, 54.307690',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}
