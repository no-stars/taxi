import { Pool } from 'pg'
import {
  PgShiftTypeRepository,
} from '@infrastructure/persistence/pg/repository/shift-type.repository'
import { PgShiftRepository } from '@infrastructure/persistence/pg/repository/shift.repository'
import {
  PgDriverActivityRepository,
} from '@infrastructure/persistence/pg/repository/driver-activity.repository'
import shiftTypeRows from '@infrastructure/persistence/pg/seeders/shift-types.json'
import { ArrayUtils, StringUtils } from '@libs/common/utils'
import { Seed } from '@libs/common/interfaces'
import { SEED_COUNT } from '@libs/common/constants'

export class ShiftSeed implements Seed {

  private readonly shiftRepo: PgShiftRepository
  private readonly shiftTypeRepo: PgShiftTypeRepository
  private readonly driverActivityRepo: PgDriverActivityRepository
  private readonly shiftTypeIds: string[] = []
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.shiftRepo = new PgShiftRepository(this.pool)
    this.shiftTypeRepo = new PgShiftTypeRepository(this.pool)
    this.driverActivityRepo = new PgDriverActivityRepository(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('ShiftSeed start')

    await this.seedShiftTypes()
    await this.seedShifts()
    await this.seedDriverActivities()

    console.log('ShiftSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private async seedShiftTypes(): Promise<void> {
    console.log('-ProfileSeed.ShiftType')

    for (const shiftTypeRow of shiftTypeRows) {
      const shiftType = {
        shift_type_id: StringUtils.uuid(),
        shift_name: shiftTypeRow.shift_name,
        price: shiftTypeRow.price,
        working_hours: shiftTypeRow.working_hours,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      }

      try {
        await this.shiftTypeRepo.addShiftType(shiftType)
        this.shiftTypeIds.push(shiftType.shift_type_id)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private async seedShifts(): Promise<void> {
    console.log('-ProfileSeed.Shift')

    for (const item of ArrayUtils.range(SEED_COUNT.shifts)) {
      const shiftData = this.generateShiftData()
      try {
        await this.shiftRepo.addShift(shiftData)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private async seedDriverActivities(): Promise<void> {
    console.log('-ProfileSeed.DriverActivity')

    for (const item of ArrayUtils.range(SEED_COUNT.driverActivities)) {
      const driverActivityData = ShiftSeed.generateDriverActivity()
      try {
        await this.driverActivityRepo.addDriverActivity(driverActivityData)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private generateShiftData(): any {
    const shiftTypeId: string = ArrayUtils.randomChoice(this.shiftTypeIds)

    return {
      shift_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      shift_type_id: shiftTypeId,
      payment_id: StringUtils.uuid(),
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

  private static generateDriverActivity(): any {
    const ALLOWED_STATUS: string[] = ['online', 'offline', 'paused']
    const status: string = ArrayUtils.randomChoice(ALLOWED_STATUS)

    return {
      driver_activity_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      car_id: StringUtils.uuid(),
      status,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}
