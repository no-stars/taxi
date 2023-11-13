import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@application/modules/infrastructure.module'
import { RootController } from '@application/controllers/root.controller'
import MicroservicesModule from '@infrastructure/microservices/microservices.module'
import {
  ORDER_SERVICE_TOKEN,
  OrderServiceHttpAdapter,
} from '@infrastructure/microservices/orders/orders.service'
import { HttpModule, HttpService } from '@nestjs/axios'


@Module({
  imports: [
    InfrastructureModule,
    MicroservicesModule,
    HttpModule,
  ],
  controllers: [
    RootController,
  ],
  providers: [
    {
      provide: ORDER_SERVICE_TOKEN,
      useFactory: (httpService: HttpService) => {
        return new OrderServiceHttpAdapter(httpService)
      },
      inject: [HttpService],
    },
  ],
})
export class RootModule {}
