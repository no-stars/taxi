import { Module } from '@nestjs/common'

import { ProfileController } from '@application/controllers/profile.controller'
import { PgPassengerRepository } from '@infrastructure/persistence/pg/repository/passenger.repository'
import { PgDriverRepository } from '@infrastructure/persistence/pg/repository/driver.repository'
import { PgPersonRepository } from '@infrastructure/persistence/pg/repository/person.repository'
import { PgSavedAddressRepository } from '@infrastructure/persistence/pg/repository/saved-address.repository'


@Module({
  imports: [
  ],
  providers: [
    PgPassengerRepository,
    PgDriverRepository,
    PgPersonRepository,
    PgSavedAddressRepository,
  ],
  controllers: [
    ProfileController,
  ],
})
export class ProfileModule {}
