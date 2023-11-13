import { Logger, Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { IsOptional, IsString } from 'class-validator'

class OrderCreate {

  @IsString()
  @IsOptional()
  orderId: string
  @IsString()
  passenger: string
  @IsString()
  driver: string

}

@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() message: OrderCreate) {
    this.logger.log('handleUserCreated')
    this.logger.log(message)
  }

}
