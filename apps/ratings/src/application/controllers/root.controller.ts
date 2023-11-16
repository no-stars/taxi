import { Logger, Controller } from '@nestjs/common'


@Controller()
export class RootController {

  private readonly logger = new Logger(RootController.name)

}
