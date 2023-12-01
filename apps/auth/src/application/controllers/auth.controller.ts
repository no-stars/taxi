import { Logger, Controller, Post, Body } from '@nestjs/common'
import { ConfirmUseCase } from '@core/service/usecase/confirm.usecase'
import { SignInUseCase } from '@core/service/usecase/sign-in.usecase'
import { ValidateUseCase } from '@core/service/usecase/validate.usecase'
import { ConfirmCode } from '@core/common/confirm-code'
import {
  SignInRequestBody,
  ConfirmPhoneRequestBody,
  ValidateTokenRequestBody,
  SignUpRequestBody,
  ConfirmPhoneResponseBody,
  ValidateTokenResponseBody,
} from '@libs/communication/auth/api'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'


@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name)

  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly confirmUseCase: ConfirmUseCase,
    private readonly validateUseCase: ValidateUseCase
  ) {}

  @Post('sign_in')
  @ApiOperation({ summary: 'Совершить авторизацию в системе' })
  @ApiBody({ type: SignInRequestBody })
  @ApiResponse({ status: 201 })
  async signIn(@Body() body: SignInRequestBody): Promise<void> {
    this.logger.log('signIn')
    await this.signInUseCase.execute(body.phoneNumber)
  }

  @Post('sign_up')
  @ApiOperation({ summary: 'Зарегистрироваться в системе' })
  @ApiBody({ type: SignUpRequestBody })
  @ApiResponse({ status: 201 })
  async signUp(@Body() body: SignUpRequestBody): Promise<void> {
    this.logger.log('signUn')
    await this.signInUseCase.execute(body.phoneNumber)
  }

  @Post('confirm_phone')
  @ApiOperation({ summary: 'Подтвердить код отправленный на номер телефона' })
  @ApiBody({ type: ConfirmPhoneRequestBody })
  @ApiResponse({ status: 201, type: ConfirmPhoneResponseBody })
  async confirm(@Body() body: ConfirmPhoneRequestBody): Promise<ConfirmPhoneResponseBody> {
    this.logger.log('confirm')
    const code = new ConfirmCode(body.code)
    return await this.confirmUseCase.execute({ phoneNumber: body.phoneNumber, providedCode: code })
  }

  @Post('validate_token')
  @ApiOperation({ summary: 'Расшифровать JWT токен' })
  @ApiBody({ type: ValidateTokenRequestBody })
  @ApiResponse({ status: 201, type: ValidateTokenResponseBody })
  async validate(@Body() body: ValidateTokenRequestBody): Promise<ValidateTokenResponseBody> {
    this.logger.log('validate')
    return await this.validateUseCase.execute({ accessToken: body.accessToken })
  }

}
