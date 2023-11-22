import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PgCarRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-repository.adapter'
import { PgCarDriverRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-driver-repository.adapter'
import { PgCarModelRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-model-repository.adapter'
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


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let carRepo: PgCarRepositoryAdapter
  let carDriverRepo: PgCarDriverRepositoryAdapter
  let carModelRepo: PgCarModelRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const autoMigrations = [
      new CarInit(pool),
      new CarDriverInit(pool),
      new PriceSegmentRequirementInit(pool),
      new CarModelInit(pool),
      new CarRelations(pool),
      new PriceSegmentRequirementRelations(pool),
      new CarDriverRelations(pool),
    ]

    for (const migration of autoMigrations) {
      await migration.up()
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
        PgCarRepositoryAdapter,
        PgCarDriverRepositoryAdapter,
        PgCarModelRepositoryAdapter,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    carRepo = module.get(PgCarRepositoryAdapter)
    carDriverRepo = module.get(PgCarDriverRepositoryAdapter)
    carModelRepo = module.get(PgCarModelRepositoryAdapter)
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

    await carModelRepo.addCarModel(carModel)
    await carRepo.addCar(car)
    await carDriverRepo.addCarDriver(carDriver)

    const foundCar = await carRepo.findCar({ driverId: carDriver.driver_id })
    // expect(foundCar).toEqual(car)
  })
})
