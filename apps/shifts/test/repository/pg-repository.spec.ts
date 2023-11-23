import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { ShiftInit, ShiftTypeInit, DriverActivityInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { ShiftRelations } from '@infrastructure/persistence/pg/migrations/table-relations'
import { PgShiftTypeRepositoryAdapter } from '@infrastructure/persistence/pg/repository/shift-type-repository.adapter'
import { PgShiftRepositoryAdapter } from '@infrastructure/persistence/pg/repository/shift-repository.adapter'
import { PgDriverActivityRepositoryAdapter } from '@infrastructure/persistence/pg/repository/driver-activity-repository.adapter'
import { StringUtils } from '@libs/common/utils'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let shiftTypeRepo: PgShiftTypeRepositoryAdapter
  let shiftRepo: PgShiftRepositoryAdapter
  let driverActivityRepo: PgDriverActivityRepositoryAdapter

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const shiftMigrations = [
      new ShiftInit(pool),
      new ShiftTypeInit(pool),
      new DriverActivityInit(pool),
      new ShiftRelations(pool),
    ]

    for (const migration of shiftMigrations) {
      await migration.up()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgShiftTypeRepositoryAdapter,
        PgDriverActivityRepositoryAdapter,
        PgShiftRepositoryAdapter,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    shiftTypeRepo = module.get(PgShiftTypeRepositoryAdapter)
    driverActivityRepo = module.get(PgDriverActivityRepositoryAdapter)
    shiftRepo = module.get(PgShiftRepositoryAdapter)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and then find multiple shift types', async () => {
    const shiftType1 = {
      shift_type_id: StringUtils.uuid(),
      shift_name: 'asd',
      price: 600,
      working_hours: 10,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const shiftType2 = {
      shift_type_id: StringUtils.uuid(),
      shift_name: 'zxc',
      price: 1200,
      working_hours: 4,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await shiftTypeRepo.addShiftType(shiftType1)
    await shiftTypeRepo.addShiftType(shiftType2)

    const foundShiftTypes = await shiftTypeRepo.findShiftTypeList()
    expect(foundShiftTypes).toEqual([shiftType1, shiftType2])
  })

  it('should create and then find multiple driver activities by driver', async () => {
    const driverActivity1 = {
      driver_activity_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      car_id: StringUtils.uuid(),
      status: 'online',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const driverActivity2 = {
      driver_activity_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      car_id: null,
      status: 'offline',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await driverActivityRepo.addDriverActivity(driverActivity1)
    await driverActivityRepo.addDriverActivity(driverActivity2)

    const foundDriverActivity = await driverActivityRepo.findDriverActivityList({ driverId: driverActivity2.driver_id })
    expect(foundDriverActivity).toEqual([driverActivity2])
  })

  it('should create and then find multiple shifts', async () => {
    const shiftType = {
      shift_type_id: StringUtils.uuid(),
      shift_name: 'dsa',
      price: 600,
      working_hours: 10,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const shift1 = {
      shift_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      shift_type_id: shiftType.shift_type_id,
      payment_id: StringUtils.uuid(),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const shift2 = {
      shift_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      shift_type_id: shiftType.shift_type_id,
      payment_id: StringUtils.uuid(),
      created_at: new Date(150),
      updated_at: null,
      deleted_at: null,
    }

    await shiftTypeRepo.addShiftType(shiftType)
    await shiftRepo.addShift(shift1)
    await shiftRepo.addShift(shift2)

    const foundShifts = await shiftRepo.findShiftList({ day: new Date(0) })
    expect(foundShifts).toEqual([shift2])
  })
})
