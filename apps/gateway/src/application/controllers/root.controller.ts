import { Logger, Inject, Controller, Get } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ORDER_SERVICE } from '@infrastructure/microservices/microservices.module'

@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

  constructor(
    @Inject(ORDER_SERVICE) private readonly client: ClientKafka
  ) {}

  @Get()
  healthcheck(): string {
    this.logger.log('health check')

    this.client.emit(
      'order_created',
      `{
        orderId: '7788',
        passenger: '1234',
        driver: '5432',
      }`
    )

    return 'Alive'
  }

}
