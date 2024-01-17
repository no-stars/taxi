import { Injectable, Logger } from '@nestjs/common'
import { ConfirmCode } from '@core/common/confirm-code'
import { Nullable } from '@libs/common/types/nullable'
import { Optional } from '@libs/common/types/optional'


export interface ConfirmCodeRepositoryPort {
  set(phone: string, payload: ConfirmCode): Promise<void>
  get(phone: string): Promise<Nullable<ConfirmCode>>
  del(phone: string): Promise<void>
}


@Injectable()
export class InMemoryConfirmCodeRepository implements ConfirmCodeRepositoryPort {

  private readonly logger = new Logger(InMemoryConfirmCodeRepository.name)
  private readonly confirmCodes = new Map()

  constructor() {}

  public async set(phone: string, payload: ConfirmCode): Promise<void> {
    this.logger.log('set')
    this.confirmCodes.set(phone, payload.toString())
  }

  public async get(phone: string): Promise<Nullable<ConfirmCode>> {
    this.logger.log('get')
    const code: Optional<string> = this.confirmCodes.get(phone)
    const result: Nullable<ConfirmCode> = code ? new ConfirmCode(code) : null

    return result
  }

  public async del(phone: string): Promise<void> {
    this.logger.log('del')
    this.confirmCodes.delete(phone)
  }

}
