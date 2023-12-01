import { Logger, Inject, Controller, Post, Body } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiQuery, ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger'
import { AUTH_SERVICE_TOKEN } from '@core/common/tokens'
import { AuthServicePort } from '@infrastructure/microservices/auth/auth-port'
import {
  SignInRequestBody,
  SignUpRequestBody,
  ConfirmPhoneRequestBody,
  ConfirmPhoneResponseBody,
} from '@application/controllers/documentation/auth'


@ApiTags('auth')
@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name)

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthServicePort
  ) {}

  @Post('sign_in')
  @ApiOperation({ summary: 'Совершить авторизацию в системе' })
  @ApiBody({ type: SignInRequestBody })
  @ApiResponse({ status: 201 })
  async signIn(@Body() body: SignInRequestBody): Promise<void> {
    this.logger.log('signIn')
    await this.authService.signIn(body)
  }

  @Post('sign_up')
  @ApiOperation({ summary: 'Зарегистрироваться в системе' })
  @ApiBody({ type: SignUpRequestBody })
  @ApiResponse({ status: 201 })
  async signUp(@Body() body: any): Promise<void> {
    this.logger.log('signUp')
    await this.authService.signIn(body)
  }

  @Post('confirm_phone')
  @ApiOperation({ summary: 'Подтвердить код отправленный на номер телефона' })
  @ApiBody({ type: ConfirmPhoneRequestBody })
  @ApiResponse({ status: 201, type: ConfirmPhoneResponseBody })
  async confirm(@Body() body: any): Promise<ConfirmPhoneResponseBody> {
    this.logger.log('confirm')
    return await this.authService.confirm(body)
  }

}
