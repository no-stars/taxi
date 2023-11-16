import { Inject, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { SelectQueryBuilder, InsertResult } from 'typeorm'
import { PG_CONNECTION } from '@infrastructure/persistent/database.config'
import { Pool } from 'pg'


interface ResourceRepositoryPort {
  addOrder(payload: any): Promise<any>
  findOrderList(): Promise<any[]>
}


@Injectable()
export class PgOrderRepositoryAdapter implements ResourceRepositoryPort {

  private readonly orderAlias: string = 'orders'

  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  public async addOrder(payload: any): Promise<any> {
    const result: any = await this.pool.query(`INSERT INTO ${this.orderAlias} VALUES ('')`)

    // ride_id, start_location, finish_location, passenger_id, price_segment, recommended_price, price, payment_type, order_type
    // NULL,

    return ormEntity
  }

  public async findOrderList(): Promise<any[]> {
    const query: SelectQueryBuilder<TypeOrmDriver> = this.buildResourceQueryBuilder()

    const ormEntity: any[] = await query.getMany()

    return ormEntity
  }

}
