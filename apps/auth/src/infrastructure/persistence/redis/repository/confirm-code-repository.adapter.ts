import { Injectable, Logger } from '@nestjs/common'
import { ConfirmCode } from '@core/common/confirm-code'


export interface ConfirmCodeRepositoryPort {
  set(phone: string, payload: ConfirmCode): void
  get(phone: string): ConfirmCode
  reset(phone: string): void
}


@Injectable()
export class InMemoryConfirmCodeRepositoryAdapter implements ConfirmCodeRepositoryPort {

  private readonly logger = new Logger(InMemoryConfirmCodeRepositoryAdapter.name)
  private readonly confirmCodes = new Map()

  constructor() {}

  public set(phone: string, payload: ConfirmCode): void {
    this.logger.log('set')
    this.confirmCodes.set(phone, payload.toString())
  }

  public get(phone: string): ConfirmCode {
    this.logger.log('get')
    const code: string = this.confirmCodes.get(phone)
    return new ConfirmCode(code)
  }

  public reset(phone: string): void {
    this.logger.log('reset')
    this.confirmCodes.delete(phone)
  }

}
