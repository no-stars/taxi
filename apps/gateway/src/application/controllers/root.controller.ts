import { Logger, Inject, Controller, Get } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ORDER_SERVICE } from '@infrastructure/microservices/microservices.module'
import { ORDER_SERVICE_TOKEN, OrderServicePort } from '@infrastructure/microservices/orders/orders.service'

@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

  constructor(
    @Inject(ORDER_SERVICE) private readonly client: ClientKafka,
    @Inject(ORDER_SERVICE_TOKEN) private readonly orderService: OrderServicePort
  ) {}

  @Get()
  healthcheck(): string {
    this.logger.log('health check')

    this.client.emit(
      'order_created',
      {
        orderId: '7788',
        passenger: '1234',
        driver: '5432',
      }
    )

    return 'Alive'
  }

  @Get('test')
  async test(): Promise<string> {
    this.logger.log('test')

    const serviceRequest: string = await this.orderService.placeOrder('asd')

    this.logger.log(`Service request ${serviceRequest}`)

    return 'Tested'
  }

}
