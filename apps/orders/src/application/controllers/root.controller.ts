import { Controller, Get } from '@nestjs/common'
import { Logger, Inject } from '@nestjs/common'
import { PG_CONNECTION } from '@infrastructure/persistent/database.config'
import { Pool } from 'pg'

@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

  constructor(@Inject(PG_CONNECTION) private readonly connection: Pool) {}

  @Get()
  async healthcheck(): Promise<string> {
    this.logger.log('health check')
    return 'Alive'
  }

}
