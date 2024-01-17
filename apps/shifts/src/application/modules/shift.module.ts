import { Module } from '@nestjs/common'

import { ShiftController } from '@application/controllers/shift.controller'
import { PgShiftRepository } from '@infrastructure/persistence/pg/repository/shift.repository'
import { PgShiftTypeRepository } from '@infrastructure/persistence/pg/repository/shift-type.repository'
import { PgDriverActivityRepository } from '@infrastructure/persistence/pg/repository/driver-activity.repository'


@Module({
  imports: [
  ],
  providers: [
    PgShiftRepository,
    PgShiftTypeRepository,
    PgDriverActivityRepository,
  ],
  controllers: [
    ShiftController,
  ],
})
export class ShiftModule {}
