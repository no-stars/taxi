import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'

import { ConfirmCodeRepositoryPort } from '@infrastructure/persistent/redis/repository/confirm-code-repository.adapter'
import { ConfirmCode } from '@core/common/confirm-code'
import { AccountRepositoryPort } from '@infrastructure/persistent/pg/repository/account-repository.adapter'
import { Account } from '@core/domain/entities/account.entity'
import { Nullable } from '@libs/common/types/nullable'


interface ConfirmUseCasePayload {
  phoneNumber: string
  providedCode: ConfirmCode
}

interface ConfirmUseCaseResult {
  accessToken: string
}

interface JwtPayload {
  sub: string
}

export class ConfirmUseCase {

  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly confirmCodeRepository: ConfirmCodeRepositoryPort,
    private readonly jwtService: JwtService
  ) {}

  public async execute(payload: ConfirmUseCasePayload): Promise<ConfirmUseCaseResult> {
    const validCode: ConfirmCode = await this.confirmCodeRepository.get(payload.phoneNumber)
    const isValid: boolean = payload.providedCode.isEqual(validCode)

    if (!isValid) {
      throw new UnauthorizedException()
    }

    await this.confirmCodeRepository.reset(payload.phoneNumber)
    let account: Nullable<Account> = await this.accountRepository.findAccount({ phoneNumber: payload.phoneNumber })

    if (!account) {
      const newAccount: Account = Account.new({
        phoneNumber: payload.phoneNumber,
      })
      account = await this.accountRepository.addAccount(newAccount)
    }

    const jwtPayload: JwtPayload = { sub: account.getId() }
    const accessToken: string = await this.jwtService.signAsync(jwtPayload)

    return { accessToken }
  }

}
