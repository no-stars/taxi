import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { firstValueFrom, Observable } from 'rxjs'
import * as qs from 'querystring'
import SmsSystemPort from '@infrastructure/external-systems/sms/sms-port.interface'
import { FakeResponse } from '@infrastructure/external-systems/sms/sms-types'

const SUCCESS_STATUS = 'OK'

@Injectable()
export class SmsSystemFakeAdapter implements SmsSystemPort {

  private readonly SERVICE_URI = 'https://fakerapi.it'
  private readonly logger = new Logger(SmsSystemFakeAdapter.name)

  constructor(private readonly httpService: HttpService) {}

  public async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    this.logger.log('sendSMS')

    const params: string = qs.stringify({
      _quantity: 1,
      phone_number: 'phone',
      text: 'text',
    })

    const uri = `${this.SERVICE_URI}/api/v1/custom?${params}`

    const obs: Observable<AxiosResponse<FakeResponse>> = this.httpService.get(uri)
    const result: AxiosResponse<FakeResponse> = await firstValueFrom(obs)
    const data: FakeResponse = result.data

    return data.status === SUCCESS_STATUS
  }

}
