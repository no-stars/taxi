import { Module } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import { OrderServiceHttpAdapter } from '@infrastructure/microservices/orders/orders.service'


@Module({
  imports: [HttpModule],
  providers: [OrderServiceHttpAdapter],
  exports: [OrderServiceHttpAdapter],
})
export default class OrdersModule {}
