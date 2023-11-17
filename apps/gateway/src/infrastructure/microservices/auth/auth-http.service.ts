import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable, firstValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'


export interface AuthServicePort {
   signIn(payload: any): Promise<any>
   confirm(payload: any): Promise<any>
   validate(payload: any): Promise<any>
}


@Injectable()
export class AuthServiceHttpAdapter implements AuthServicePort {

  private readonly SERVICE_URI = process.env.AUTH_SERVICE_URI
  private readonly logger = new Logger(AuthServiceHttpAdapter.name)

  constructor(private readonly httpService: HttpService) {}

  public async signIn(payload: any): Promise<any> {
    this.logger.log('signIn')
    const obs: Observable<AxiosResponse<string>> = this.httpService.post(`${this.SERVICE_URI}/auth/signIn`, payload)
    const result: AxiosResponse<string> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

  public async confirm(payload: any): Promise<any> {
    this.logger.log('confirm')
    const obs: Observable<AxiosResponse<string>> = this.httpService.post(`${this.SERVICE_URI}/auth/confirm`, payload)
    const result: AxiosResponse<string> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

  public async validate(payload: any): Promise<any> {
    this.logger.log('validate')
    const obs: Observable<AxiosResponse<string>> = this.httpService.post(`${this.SERVICE_URI}/auth/validate`, payload)
    const result: AxiosResponse<string> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

}
