import { Logger, Inject, Controller, Post, Body } from '@nestjs/common'
import { AUTH_SERVICE_TOKEN } from '@core/common/tokens'
import { AuthServicePort } from '@infrastructure/microservices/auth/auth-http.service'

@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name)

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthServicePort
  ) {}

  @Post('signIn')
  async signIn(@Body() body: any): Promise<any> {
    this.logger.log('signIn')

    return await this.authService.signIn(body)
  }

  @Post('signUp')
  async signUp(@Body() body: any): Promise<any> {
    this.logger.log('signUp')

    return await this.authService.signIn(body)
  }

  @Post('confirm')
  async confirm(@Body() body: any): Promise<any> {
    this.logger.log('confirm')

    return await this.authService.confirm(body)
  }

}
