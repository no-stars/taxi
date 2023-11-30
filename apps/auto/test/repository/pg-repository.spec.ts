import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PgCarRepository } from '@infrastructure/persistence/pg/repository/car.repository'
import { PgCarDriverRepository } from '@infrastructure/persistence/pg/repository/car-driver.repository'
import { PgCarModelRepository } from '@infrastructure/persistence/pg/repository/car-model.repository'
import {
  PgPriceSegmentRequirementRepository,
} from '@infrastructure/persistence/pg/repository/price-segment-requirement.repository'
import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
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
import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let carRepo: PgCarRepository
  let carDriverRepo: PgCarDriverRepository
  let carModelRepo: PgCarModelRepository
  let priceSegmentRequirementRepo: PgPriceSegmentRequirementRepository

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const migrations: Migration[] = [
      new CarInit(pool),
      new CarDriverInit(pool),
      new PriceSegmentRequirementInit(pool),
      new CarModelInit(pool),
      new CarRelations(pool),
      new PriceSegmentRequirementRelations(pool),
      new CarDriverRelations(pool),
    ]

    const runner = new MigrationRunner(migrations)
    await runner.up()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgCarRepository,
        PgCarDriverRepository,
        PgCarModelRepository,
        PgPriceSegmentRequirementRepository,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    carRepo = module.get(PgCarRepository)
    carDriverRepo = module.get(PgCarDriverRepository)
    carModelRepo = module.get(PgCarModelRepository)
    priceSegmentRequirementRepo = module.get(PgPriceSegmentRequirementRepository)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and then find car', async () => {
    const carModel = {
      car_model_id: StringUtils.uuid(),
      car_brand: 'ACURA',
      model_name: 'MDX',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const car = {
      car_id: StringUtils.uuid(),
      car_model_id: carModel.car_model_id,
      plate_number: '123',
      release_year: 2003,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const carDriver = {
      car_driver_id: StringUtils.uuid(),
      car_id: car.car_id,
      driver_id: StringUtils.uuid(),
    }
    const priceSegmentRequirement = {
      price_segment_requirement_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      car_model_id: carModel.car_model_id,
      min_year: 2013,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await carModelRepo.addCarModel(carModel)
    await carRepo.addCar(car)
    await carDriverRepo.addCarDriver(carDriver)
    await priceSegmentRequirementRepo.addPriceSegmentRequirement(priceSegmentRequirement)

    const foundCar = await carRepo.findCar({ driverId: carDriver.driver_id })
    const foundCarModels = await carModelRepo.findCarModelList({ brandId: carModel.car_brand })
    // expect(foundCar).toEqual(car)
    // expect(foundCarModels).toEqual([carModel])
  })
})
