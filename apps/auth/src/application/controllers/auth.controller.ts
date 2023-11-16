import { Logger, Controller, Post, Body } from '@nestjs/common'
import { ConfirmUseCase } from '@core/service/usecase/confirm.usecase'
import { SignInUseCase } from '@core/service/usecase/sign-in.usecase'
import { ConfirmCode } from '@core/common/confirm-code'
import { IsString } from 'class-validator'

class SignInRequestBody {

  @IsString()
  phoneNumber: string

}

class ConfirmRequestBody {

  @IsString()
  phoneNumber: string

  @IsString()
  code: string

}


@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name)

  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly confirmUseCase: ConfirmUseCase
  ) {}

  @Post('signIn')
  async signIn(@Body() body: SignInRequestBody): Promise<string> {
    this.logger.log('signIn')
    await this.signInUseCase.execute(body.phoneNumber)

    return 'Success'
  }

  @Post('confirm')
  async confirm(@Body() body: ConfirmRequestBody): Promise<any> {
    this.logger.log('confirm')
    const code = new ConfirmCode(body.code)

    return await this.confirmUseCase.execute({ phoneNumber: body.phoneNumber, providedCode: code })
  }

}
