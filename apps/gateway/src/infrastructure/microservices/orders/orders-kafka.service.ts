import { Injectable, Logger } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'


const TOPICS = {
  ORDER_CREATED: 'order_created',
}


export interface OrderServiceAsyncPort {
  placeOrder(payload: any): any
}


@Injectable()
export class OrderServiceKafkaAdapter implements OrderServiceAsyncPort {

  constructor(private readonly client: ClientKafka) {}
  private readonly logger = new Logger(OrderServiceKafkaAdapter.name)

  public placeOrder(payload: any): any {
    this.logger.log('placeOrder start')

    this.client.emit(
      TOPICS.ORDER_CREATED,
      {
        orderId: '123asd',
        passenger: '1234',
        driver: '5432',
      }
    )
  }

}
