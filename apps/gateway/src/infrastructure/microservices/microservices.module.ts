import { Module } from '@nestjs/common'
import OrdersModule from '@infrastructure/microservices/orders/orders.module'
import AuthModule from '@infrastructure/microservices/auth/auth.module'



@Module({
  imports: [
    OrdersModule,
    AuthModule,
  ],
  exports: [
    OrdersModule,
    AuthModule,
  ],
})
export default class MicroservicesModule {}
