import { Module } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import { OrderServiceHttpAdapter } from '@infrastructure/microservices/orders/orders-http.service'
import { ORDER_SERVICE_ASYNC_TOKEN, ORDER_SERVICE_BROKER_TOKEN, ORDER_SERVICE_TOKEN } from '@core/common/tokens'
import { ClientProxyFactory, ClientKafka } from '@nestjs/microservices'
import { options } from '@libs/communication/orders'
import { OrderServiceKafkaAdapter } from '@infrastructure/microservices/orders/orders-kafka.service'


@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ORDER_SERVICE_TOKEN,
      useFactory: (httpService: HttpService) => {
        return new OrderServiceHttpAdapter(httpService)
      },
      inject: [HttpService],
    },
    {
      provide: ORDER_SERVICE_ASYNC_TOKEN,
      useFactory: (kafkaClient: ClientKafka) => {
        return new OrderServiceKafkaAdapter(kafkaClient)
      },
      inject: [ORDER_SERVICE_BROKER_TOKEN],
    },
    {
      provide: ORDER_SERVICE_BROKER_TOKEN,
      useFactory: () => ClientProxyFactory.create({
        transport: options.transport,
        options: {
          producerOnlyMode: true,
          client: {
            clientId: process.env.SERVICE_NAME,
            brokers: options.options?.client?.brokers || [],
          },
        },
      }),
    },
  ],
  exports: [
    ORDER_SERVICE_TOKEN,
    ORDER_SERVICE_ASYNC_TOKEN,
  ],
})
export default class OrdersModule {}
