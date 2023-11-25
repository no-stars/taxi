import { Pool } from 'pg'
import { faker } from '@faker-js/faker'

import { PgCarModelRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-model-repository.adapter'
import { PgCarRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-repository.adapter'
import { PgCarDriverRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-driver-repository.adapter'
import {
  PgPriceSegmentRequirementRepositoryAdapter,
} from '@infrastructure/persistence/pg/repository/price-segment-requirement-repository.adapter'

import { ArrayUtils, NumberUtils, StringUtils } from '@libs/common/utils'
import { Seed } from '@libs/common/interfaces'
import { SEED_COUNT } from '@libs/common/constants'

import CarModelRows from '@infrastructure/persistence/pg/seeders/models.json'
import PriceSegmentRequirementRows from '@infrastructure/persistence/pg/seeders/requirements.json'


export class AutoSeed implements Seed {

  private readonly carRepo: PgCarRepositoryAdapter
  private readonly carDriversRepo: PgCarDriverRepositoryAdapter
  private readonly carModelRepo: PgCarModelRepositoryAdapter
  private readonly priceSegmentRequirementRepo: PgPriceSegmentRequirementRepositoryAdapter
  private readonly carModelIds = new Map()
  private readonly carIds: string[] = []

  constructor(private readonly pool: Pool) {
    this.carRepo = new PgCarRepositoryAdapter(this.pool)
    this.carDriversRepo = new PgCarDriverRepositoryAdapter(this.pool)
    this.carModelRepo = new PgCarModelRepositoryAdapter(this.pool)
    this.priceSegmentRequirementRepo = new PgPriceSegmentRequirementRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('AutoSeed start')

    await this.seedCarModels()
    await this.seedPriceSegmentRequirements()
    await this.seedCars()
    await this.seedCarDrivers()

    console.log('AutoSeed finished')
  }

  private async seedCars(): Promise<void> {
    console.log('-AutoSeed.Cars')

    for (const item of ArrayUtils.range(SEED_COUNT.cars)) {
      const carData = this.generateCarData()
      await this.carRepo.addCar(carData)
      this.carIds.push(carData.car_id)
    }
  }

  private async seedCarDrivers(): Promise<void> {
    console.log('-AutoSeed.CarDrivers')

    for (const item of ArrayUtils.range(SEED_COUNT.carDrivers)) {
      const carDriverData = this.generateCarDriverData()
      await this.carDriversRepo.addCarDriver(carDriverData)
    }
  }

  private async seedCarModels(): Promise<void> {
    console.log('-AutoSeed.CarModels')

    for (const carModelRow of CarModelRows) {
      const carModel = {
        car_model_id: StringUtils.uuid(),
        car_brand: carModelRow.car_brand,
        model_name: carModelRow.model_name,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      }

      this.carModelIds.set(carModel.model_name, carModel.car_model_id)
      await this.carModelRepo.addCarModel(carModel)
    }
  }

  private async seedPriceSegmentRequirements(): Promise<void> {
    console.log('-AutoSeed.PriceSegmentRequirements')

    for (const PriceSegmentRequirementRow of PriceSegmentRequirementRows) {
      const carModel = {
        price_segment_requirement_id: StringUtils.uuid(),
        price_segment: PriceSegmentRequirementRow.price_segment,
        car_model_id: this.carModelIds.get(PriceSegmentRequirementRow.car_model_id),
        min_year: PriceSegmentRequirementRow.min_year,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      }

      await this.priceSegmentRequirementRepo.addPriceSegmentRequirement(carModel)
    }
  }

  private generateCarData(): any {
    const carModelIds = [...this.carModelIds.values()]
    const carModelId = carModelIds[NumberUtils.randomInt(0, this.carModelIds.size - 1)]
    const releaseYear = NumberUtils.randomInt(2007, 2023)
    const now = new Date()

    return {
      car_id: StringUtils.uuid(),
      car_model_id: carModelId,
      plate_number: faker.vehicle.vrm(),
      release_year: releaseYear,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
  }

  private generateCarDriverData(): any {
    const carId = this.carIds[NumberUtils.randomInt(0, this.carIds.length - 1)]
    const now = new Date()

    return {
      car_driver_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      car_id: carId,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
  }

}
