import { Controller, Get } from '@nestjs/common'
import { Logger } from '@nestjs/common'

@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

  constructor() {}

  @Get()
  healthcheck(): string {
    this.logger.log('health check')
    return 'Alive'
  }

}
