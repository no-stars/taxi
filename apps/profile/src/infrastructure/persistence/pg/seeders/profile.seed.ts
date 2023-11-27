import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import { PgPassengerRepositoryAdapter } from '@infrastructure/persistence/pg/repository/passenger-repository.adapter'
import { PgDriverRepositoryAdapter } from '@infrastructure/persistence/pg/repository/driver-repository.adapter'
import { PgPersonRepositoryAdapter } from '@infrastructure/persistence/pg/repository/person-repository.adapter'
import {
  PgSavedAddressRepositoryAdapter,
} from '@infrastructure/persistence/pg/repository/saved-address-repository.adapter'
import { StringUtils, ArrayUtils, NumberUtils } from '@libs/common/utils'
import { SEED_COUNT } from '@libs/common/constants'
import { Seed } from '@libs/common/interfaces'


export class ProfileSeed implements Seed {

  private readonly passengerRepo: PgPassengerRepositoryAdapter
  private readonly driverRepo: PgDriverRepositoryAdapter
  private readonly personRepo: PgPersonRepositoryAdapter
  private readonly savedAddressRepo: PgSavedAddressRepositoryAdapter
  private readonly passengerIds: string[] = []
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.passengerRepo = new PgPassengerRepositoryAdapter(this.pool)
    this.driverRepo = new PgDriverRepositoryAdapter(this.pool)
    this.personRepo = new PgPersonRepositoryAdapter(this.pool)
    this.savedAddressRepo = new PgSavedAddressRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('ProfileSeed start')

    await this.seedPassengers()
    await this.seedDrivers()
    await this.seedSavedAddresses()

    console.log('ProfileSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private async seedPassengers(): Promise<void> {
    console.log('-ProfileSeed.Passenger')

    for (const item of ArrayUtils.range(SEED_COUNT.passengers)) {
      const personData = ProfileSeed.generatePersonData()
      const passengerData = ProfileSeed.generatePassengerData(personData.person_id)

      try {
        await this.personRepo.addPerson(personData)
        await this.passengerRepo.addPassenger(passengerData)
        this.passengerIds.push(passengerData.passenger_id)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private async seedDrivers(): Promise<void> {
    console.log('-ProfileSeed.Driver')

    for (const item of ArrayUtils.range(SEED_COUNT.drivers)) {
      const personData = ProfileSeed.generatePersonData()
      const driverData = ProfileSeed.generateDriverData(personData.person_id)

      try {
        await this.personRepo.addPerson(personData)
        await this.driverRepo.addDriver(driverData)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private async seedSavedAddresses(): Promise<void> {
    console.log('-ProfileSeed.SavedAddress')

    for (const item of ArrayUtils.range(SEED_COUNT.savedAddresses)) {
      const savedAddressData = this.generateSavedAddressData()

      try {
        await this.savedAddressRepo.addSavedAddress(savedAddressData)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private static generatePassengerData(personId: string): any {
    return {
      passenger_id: StringUtils.uuid(),
      person_id: personId,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

  private generateSavedAddressData(): any {
    const passengerId: string = ArrayUtils.randomChoice(this.passengerIds)

    return {
      saved_address_id: StringUtils.uuid(),
      address_name: faker.location.streetAddress(),
      passenger_id: passengerId,
      coordinates: faker.location.nearbyGPSCoordinate().join(', '),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

  private static generateDriverData(personId: string): any {
    return {
      driver_id: StringUtils.uuid(),
      person_id: personId,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

  private static generatePersonData(): any {
    return {
      person_id: StringUtils.uuid(),
      account_id: StringUtils.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      middle_name: faker.person.middleName(),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}
