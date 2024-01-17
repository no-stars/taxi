import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable, firstValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'


export interface OrderServicePort {
   performOrder(payload: any): Promise<any>
}


@Injectable()
export class OrderServiceHttpAdapter implements OrderServicePort {

  private readonly SERVICE_URI = process.env.ORDER_SERVICE_URI
  private readonly logger = new Logger(OrderServiceHttpAdapter.name)

  constructor(private readonly httpService: HttpService) {}

  public async performOrder(payload: any): Promise<any> {
    this.logger.log('performOrder start')
    const obs: Observable<AxiosResponse<string>> = this.httpService.get(`${this.SERVICE_URI}/api`)
    const result: AxiosResponse<string> = await firstValueFrom(obs)
    const { data } = result

    return data
  }

}
