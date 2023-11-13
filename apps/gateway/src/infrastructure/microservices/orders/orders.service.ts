import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { Observable, firstValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'


export const ORDER_SERVICE_TOKEN = Symbol('ORDER_SERVICE_TOKEN')

export interface OrderServicePort {
   placeOrder(payload: any): Promise<any>
}


@Injectable()
export class OrderServiceHttpAdapter implements OrderServicePort {

  private SERVICE_URI = process.env.ORDER_SERVICE_URI

  constructor(private readonly httpService: HttpService) {}

  public async placeOrder(payload: any): Promise<any> {
    console.log('place an order')
    const obs: Observable<AxiosResponse<string>> = this.httpService.get(`http://localhost:3000/api`)
    const result: AxiosResponse<string> = await firstValueFrom(obs)
    const { data } = result

    return data
    // return return this.httpService.get(`${this.SERVICE_URI}/api`)
  }

}
