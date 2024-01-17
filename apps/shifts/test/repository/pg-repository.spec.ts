import { RootModule } from '@application/modules/root.module'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { ShiftInit, ShiftTypeInit, DriverActivityInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { ShiftRelations } from '@infrastructure/persistence/pg/migrations/table-relations'
import { PgShiftTypeRepository } from '@infrastructure/persistence/pg/repository/shift-type.repository'
import { PgShiftRepository } from '@infrastructure/persistence/pg/repository/shift.repository'
import { PgDriverActivityRepository } from '@infrastructure/persistence/pg/repository/driver-activity.repository'

import { StringUtils } from '@libs/common/utils'
import { TestServer } from '@libs/testing/server/test-server'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let shiftTypeRepo: PgShiftTypeRepository
  let shiftRepo: PgShiftRepository
  let driverActivityRepo: PgDriverActivityRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [
        ShiftInit, ShiftTypeInit, DriverActivityInit, ShiftRelations,
      ],
    })

    shiftTypeRepo = testServer.testingModule.get(PgShiftTypeRepository)
    driverActivityRepo = testServer.testingModule.get(PgDriverActivityRepository)
    shiftRepo = testServer.testingModule.get(PgShiftRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and then find multiple shift types', async () => {
    // given
    const actualShiftType1 = createShiftType('asd')
    const actualShiftType2 = createShiftType('zxc')
    await shiftTypeRepo.addShiftType(actualShiftType1)
    await shiftTypeRepo.addShiftType(actualShiftType2)

    // when
    const expectedShiftTypes = await shiftTypeRepo.findShiftTypeList()

    // then
    expect([actualShiftType1, actualShiftType2]).toEqual(expectedShiftTypes)
  })

  it('should create and then find multiple driver activities filtered by driver', async () => {
    // given
    const actualDriverActivity1 = createDriverActivity()
    const actualDriverActivity2 = createDriverActivity()
    await driverActivityRepo.addDriverActivity(actualDriverActivity1)
    await driverActivityRepo.addDriverActivity(actualDriverActivity2)

    // when
    const expectedDriverActivity = await driverActivityRepo.findDriverActivityList({
      driverId: actualDriverActivity1.driver_id,
    })

    // then
    expect([actualDriverActivity1]).toEqual(expectedDriverActivity)
  })

  it('should create and then find multiple shifts filtered by date', async () => {
    // given
    const shiftType = createShiftType('qwe')
    const actualShift1 = createShift(shiftType.shift_type_id, new Date())
    const actualShift2 = createShift(shiftType.shift_type_id, new Date(150))

    await shiftTypeRepo.addShiftType(shiftType)
    await shiftRepo.addShift(actualShift1)
    await shiftRepo.addShift(actualShift2)

    // when
    const expectedShifts = await shiftRepo.findShiftList({ day: new Date(0) })

    // then
    expect([actualShift2]).toEqual(expectedShifts)
  })
})


function createShiftType(shiftName: string): any {
  return {
    shift_type_id: StringUtils.uuid(),
    shift_name: shiftName,
    price: 600,
    working_hours: 10,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createShift(shiftTypeId: string, createdAt: Date): any {
  return {
    shift_id: StringUtils.uuid(),
    driver_id: StringUtils.uuid(),
    shift_type_id: shiftTypeId,
    payment_id: StringUtils.uuid(),
    created_at: createdAt,
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createDriverActivity(): any {
  return {
    driver_activity_id: StringUtils.uuid(),
    driver_id: StringUtils.uuid(),
    car_id: StringUtils.uuid(),
    status: 'online',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}
