import { Module } from '@nestjs/common'
import OrdersModule from '@infrastructure/microservices/orders/orders.module'



@Module({
  imports: [
    OrdersModule,
  ],
  exports: [
    OrdersModule,
  ],
})
export default class MicroservicesModule {}
