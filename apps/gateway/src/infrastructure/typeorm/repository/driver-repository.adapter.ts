import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Repository, SelectQueryBuilder, InsertResult } from 'typeorm'

import { TypeOrmDriver } from '@infrastructure/typeorm/entities/typeorm-driver.entity'


interface ResourceRepositoryPort {
  addDriver(payload: any): Promise<TypeOrmDriver>
  findDriverList(): Promise<TypeOrmDriver[]>
}


@Injectable()
export class TypeOrmDriverRepositoryAdapter extends Repository<TypeOrmDriver> implements ResourceRepositoryPort {

  private readonly driverAlias: string = 'driver'

  constructor(private dataSource: DataSource) {
    super(TypeOrmDriver, dataSource.createEntityManager())
  }

  public async addDriver(payload: any): Promise<TypeOrmDriver> {
    const result: InsertResult = await this.createQueryBuilder(this.driverAlias)
      .insert()
      .into(TypeOrmDriver)
      .values([payload])
      .execute()

    const ormEntity: TypeOrmDriver = result.identifiers[0].id

    return ormEntity
  }

  public async findDriverList(): Promise<TypeOrmDriver[]> {
    const query: SelectQueryBuilder<TypeOrmDriver> = this.buildResourceQueryBuilder()

    const ormEntity: TypeOrmDriver[] = await query.getMany()

    return ormEntity
  }

  private buildResourceQueryBuilder(): SelectQueryBuilder<TypeOrmDriver> {
    return this.createQueryBuilder(this.driverAlias)
      .select()
  }

}
