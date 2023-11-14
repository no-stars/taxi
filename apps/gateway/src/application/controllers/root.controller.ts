import { Logger, Inject, Controller, Get } from '@nestjs/common'
import { OrderServicePort } from '@infrastructure/microservices/orders/orders-http.service'
import { OrderServiceAsyncPort } from '@infrastructure/microservices/orders/orders-kafka.service'
import { ORDER_SERVICE_TOKEN, ORDER_SERVICE_ASYNC_TOKEN } from '@core/common/tokens'

@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

  constructor(
    @Inject(ORDER_SERVICE_ASYNC_TOKEN) private readonly orderServiceAsync: OrderServiceAsyncPort,
    @Inject(ORDER_SERVICE_TOKEN) private readonly orderService: OrderServicePort
  ) {}

  @Get()
  healthcheck(): string {
    this.logger.log('healthCheck')

    this.orderServiceAsync.placeOrder(123)

    return 'up'
  }

  @Get('test')
  async test(): Promise<string> {
    this.logger.log('test')

    const serviceRequest: string = await this.orderService.performOrder('asd')

    this.logger.log(`Service request ${serviceRequest}`)

    return 'test'
  }

}
