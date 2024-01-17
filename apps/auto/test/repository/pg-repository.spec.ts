import { RootModule } from '@application/modules/root.module'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { PgCarRepository } from '@infrastructure/persistence/pg/repository/car.repository'
import { PgCarDriverRepository } from '@infrastructure/persistence/pg/repository/car-driver.repository'
import { PgCarModelRepository } from '@infrastructure/persistence/pg/repository/car-model.repository'
import {
  PgPriceSegmentRequirementRepository,
} from '@infrastructure/persistence/pg/repository/price-segment-requirement.repository'
import {
  CarInit,
  CarDriverInit,
  PriceSegmentRequirementInit,
  CarModelInit,
} from '@infrastructure/persistence/pg/migrations/init-tables'
import {
  CarRelations,
  PriceSegmentRequirementRelations,
  CarDriverRelations,
} from '@infrastructure/persistence/pg/migrations/table-relations'

import { StringUtils } from '@libs/common/utils'
import { TestServer } from '@libs/testing/server/test-server'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let carRepo: PgCarRepository
  let carDriverRepo: PgCarDriverRepository
  let carModelRepo: PgCarModelRepository
  let priceSegmentRequirementRepo: PgPriceSegmentRequirementRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [
        CarInit, CarDriverInit, PriceSegmentRequirementInit, CarModelInit, CarRelations,
        PriceSegmentRequirementRelations, CarDriverRelations,
      ],
    })

    carRepo = testServer.testingModule.get(PgCarRepository)
    carDriverRepo = testServer.testingModule.get(PgCarDriverRepository)
    carModelRepo = testServer.testingModule.get(PgCarModelRepository)
    priceSegmentRequirementRepo = testServer.testingModule.get(PgPriceSegmentRequirementRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and then find car', async () => {
    // given
    const actualCarModel = createCarModel()
    const actualCar = createCar(actualCarModel.car_model_id)
    const carDriver = createCarDriver(actualCar.car_id)
    const priceSegmentRequirement = createPriceSegmentRequirements(actualCarModel.car_model_id)

    await carModelRepo.addCarModel(actualCarModel)
    await carRepo.addCar(actualCar)
    await carDriverRepo.addCarDriver(carDriver)
    await priceSegmentRequirementRepo.addPriceSegmentRequirement(priceSegmentRequirement)

    // when
    const expectedCar = await carRepo.findCar({ driverId: carDriver.driver_id })
    const expectedCarModels = await carModelRepo.findCarModelList({ brandId: actualCarModel.car_brand })

    // then
    // expect(actualCar).toEqual(expectedCar)
    // expect([actualCarModel]).toEqual(expectedCarModels)
  })
})


function createCarModel(): any {
  return {
    car_model_id: StringUtils.uuid(),
    car_brand: 'ACURA',
    model_name: 'MDX',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createCar(carModelId: string): any {
  return {
    car_id: StringUtils.uuid(),
    car_model_id: carModelId,
    plate_number: '123',
    release_year: 2003,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createCarDriver(carId: string): any {
  return {
    car_driver_id: StringUtils.uuid(),
    car_id: carId,
    driver_id: StringUtils.uuid(),
  }
}

function createPriceSegmentRequirements(carModelId: string): any {
  return {
    price_segment_requirement_id: StringUtils.uuid(),
    price_segment: 'COMFORT',
    car_model_id: carModelId,
    min_year: 2013,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}
