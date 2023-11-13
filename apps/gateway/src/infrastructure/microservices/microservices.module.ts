import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { options } from '@libs/communication/orders'
import OrdersModule from '@infrastructure/microservices/orders/orders.module'


export const ORDER_SERVICE = Symbol('ORDER_SERVICE')

@Module({
  imports: [
    OrdersModule,
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: options.transport,
        options: {
          producerOnlyMode: true,
          client: {
            clientId: 'gateway',
            brokers: options.options?.client?.brokers || [],
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export default class MicroservicesModule {}
