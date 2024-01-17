import { Module } from '@nestjs/common'

import { PgPaymentRepository } from '@infrastructure/persistence/pg/repository/payment.repository'
import { PgPaymentCardRepository } from '@infrastructure/persistence/pg/repository/payment-card.repository'
import { PgWithdrawCardRepository } from '@infrastructure/persistence/pg/repository/withdraw-card.repository'


@Module({
  imports: [
  ],
  providers: [
    PgPaymentRepository,
    PgPaymentCardRepository,
    PgWithdrawCardRepository,
  ],
  controllers: [
  ],
})
export class FinanceModule {}
