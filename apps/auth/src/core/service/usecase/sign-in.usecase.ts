import { ConfirmCodeRepositoryPort } from '@infrastructure/persistent/redis/repository/confirm-code-repository.adapter'
import SmsSystemPort from '@infrastructure/external-systems/sms/sms-port.interface'
import { ConfirmCode } from '@core/common/confirm-code'


export class SignInUseCase {

  constructor(
    private readonly smsSystem: SmsSystemPort,
    private readonly confirmCodeRepository: ConfirmCodeRepositoryPort
  ) {}

  public async execute(payload: any): Promise<void> {
    const code = ConfirmCode.new(4)
    const smsText = `Код для подтверждения входа: ${code}`

    await this.confirmCodeRepository.set(payload, code)
    await this.smsSystem.sendSMS(payload, smsText)
  }

}
