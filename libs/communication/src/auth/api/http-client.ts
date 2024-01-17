import { ENDPOINTS } from './endpoints'
import { default as axios, AxiosResponse } from 'axios'
import { SignInRequestBody } from './request/sign-in-request-body'
import { ConfirmPhoneRequestBody } from './request/confirm-phone-request-body'
import { ConfirmPhoneResponseBody } from './response/confirm-phone-response-body'
import { ValidateTokenRequestBody } from './request/validate-token-request-body'
import { ValidateTokenResponseBody } from './response/validate-token-response-body'
import { AuthService } from './http-client.interface'


export class AuthServiceHttp implements AuthService {

  private readonly SERVICE_URI = process.env.AUTH_SERVICE_URI

  public async signIn(payload: SignInRequestBody): Promise<void> {
    const uri = `${this.SERVICE_URI}/auth/sign_in`
    const result: AxiosResponse<void> = await axios.post(uri, payload)
    const { data } = result

    return data
  }

  public async confirm(payload: ConfirmPhoneRequestBody): Promise<ConfirmPhoneResponseBody> {
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
