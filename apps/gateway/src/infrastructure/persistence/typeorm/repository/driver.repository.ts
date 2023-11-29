import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Repository, SelectQueryBuilder, InsertResult } from 'typeorm'

import { TypeOrmDriver } from '@infrastructure/persistence/typeorm/entities/driver.entity'


interface ResourceRepositoryPort {
  addDriver(payload: any): Promise<any>
  findDriverList(): Promise<any[]>
}


@Injectable()
export class TypeOrmDriverRepository extends Repository<TypeOrmDriver> implements ResourceRepositoryPort {

  private readonly driverAlias: string = 'driver'

  constructor(private dataSource: DataSource) {
    super(TypeOrmDriver, dataSource.createEntityManager())
  }

  public async addDriver(payload: any): Promise<any> {
    const result: InsertResult = await this.createQueryBuilder(this.driverAlias)
      .insert()
      .into(TypeOrmDriver)
      .values([payload])
      .execute()

    const ormEntity: any = result?.identifiers?.[0]?.id

    return ormEntity
  }

  public async findDriverList(): Promise<any[]> {
    const query: SelectQueryBuilder<TypeOrmDriver> = this.buildResourceQueryBuilder()

    const ormEntity: any[] = await query.getMany()

    return ormEntity
  }

  private buildResourceQueryBuilder(): SelectQueryBuilder<TypeOrmDriver> {
    return this.createQueryBuilder(this.driverAlias)
      .select()
  }

}
