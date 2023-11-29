import { Injectable, Logger, Inject } from '@nestjs/common'
import { ConfirmCode } from '@core/common/confirm-code'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Optional } from '@libs/common/types/optional'
import { Nullable } from '@libs/common/types/nullable'
import { SECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND } from '@libs/common/constants'


export interface ConfirmCodeRepositoryPort {
  set(phone: string, payload: ConfirmCode): Promise<void>
  get(phone: string): Promise<Nullable<ConfirmCode>>
  del(phone: string): Promise<void>
}


@Injectable()
export class RedisConfirmCodeRepository implements ConfirmCodeRepositoryPort {

  private readonly logger = new Logger(RedisConfirmCodeRepository.name)
  private readonly prefix = 'confirm_code'
  private readonly CODE_TTL: number = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * 5

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async set(phone: string, payload: ConfirmCode): Promise<void> {
    this.logger.log('set')
    const key: string = this.formKey(phone)
    await this.cacheManager.set(key, payload.toString(), this.CODE_TTL)
  }

  public async get(phone: string): Promise<Nullable<ConfirmCode>> {
    this.logger.log('get')
    const key: string = this.formKey(phone)
    const code: Optional<string> = await this.cacheManager.get(key)
    const result: Nullable<ConfirmCode> = code ? new ConfirmCode(code) : null

    return result
  }

  public async del(phone: string): Promise<void> {
    this.logger.log('del')
    const key: string = this.formKey(phone)
    await this.cacheManager.del(key)
  }

  private formKey(rawKey: string): string {
    return `${this.prefix}_${rawKey}`
  }

}
