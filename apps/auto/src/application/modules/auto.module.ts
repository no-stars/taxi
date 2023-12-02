import { Module } from '@nestjs/common'

import { AutoController } from '@application/controllers/auto.controller'


@Module({
  imports: [
  ],
  providers: [
  ],
  controllers: [
    AutoController,
  ],
})
export class AutoModule {}
