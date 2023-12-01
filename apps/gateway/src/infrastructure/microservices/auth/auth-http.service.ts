import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable, firstValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'
import {
  ValidateTokenRequestBody,
  ConfirmPhoneRequestBody,
  ValidateTokenResponseBody,
  ConfirmPhoneResponseBody,
  ENDPOINTS,
  ENDPOINTS_NAMESPACE,
} from '@libs/communication/auth/api'
import { AuthServicePort } from '@infrastructure/microservices/auth/auth-port'
import { SignInRequestBody } from '@application/controllers/documentation/auth'


@Injectable()
export class AuthServiceHttpAdapter implements AuthServicePort {

  private readonly SERVICE_URI = process.env.AUTH_SERVICE_URI
  private readonly logger = new Logger(AuthServiceHttpAdapter.name)

  constructor(private readonly httpService: HttpService) {}

  public async signIn(payload: SignInRequestBody): Promise<void> {
    this.logger.log('signIn')
    const uri: string = [
      this.SERVICE_URI,
      ENDPOINTS_NAMESPACE,
      ENDPOINTS.signIn,
    ].join('/')
    const obs: Observable<AxiosResponse<void>> = this.httpService.post(uri, payload)
    const result: AxiosResponse<void> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

  public async confirm(payload: ConfirmPhoneRequestBody): Promise<ConfirmPhoneResponseBody> {
    this.logger.log('confirm')
    const uri: string = [
      this.SERVICE_URI,
      ENDPOINTS_NAMESPACE,
      ENDPOINTS.confirm,
    ].join('/')
    const obs: Observable<AxiosResponse<ConfirmPhoneResponseBody>> = this.httpService.post(uri, payload)
    const result: AxiosResponse<ConfirmPhoneResponseBody> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

  public async validate(payload: ValidateTokenRequestBody): Promise<ValidateTokenResponseBody> {
    this.logger.log('validate')
    const uri: string = [
      this.SERVICE_URI,
      ENDPOINTS_NAMESPACE,
      ENDPOINTS.confirm,
    ].join('/')
    const obs: Observable<AxiosResponse<ValidateTokenResponseBody>> = this.httpService.post(uri, payload)
    const result: AxiosResponse<ValidateTokenResponseBody> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

}
