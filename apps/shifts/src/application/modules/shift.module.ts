import { Module } from '@nestjs/common'

import { ProfileController } from '@application/controllers/profile.controller'


@Module({
  imports: [
  ],
  providers: [
  ],
  controllers: [
    ProfileController,
  ],
})
export class ProfileModule {}
