import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { Resource } from '@core/domain/resource/entities/resource.entity'
import { Optional, Nullable } from '@libs/common/types'
import { ResourceEntityMapper } from '@infrastructure/typeorm/entity-mappers/resource.mapper'
import { TypeOrmResource } from '@infrastructure/typeorm/entities/typeorm-resource.entity'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { ResourceRepositoryPort } from '@core/domain/resource/port/persistence/resource-repository-port'
import { TokenPagination } from '@libs/communication/core'


@Injectable()
export class TypeOrmResourceRepositoryAdapter extends Repository<TypeOrmResource> implements ResourceRepositoryPort {

  private readonly resourceAlias: string = 'resource'

  constructor(private dataSource: DataSource) {
    super(TypeOrmResource, dataSource.createEntityManager())
  }

  public async findResource(
    by: { id: string }
  ): Promise<Optional<Resource>> {
    let domainEntity: Optional<Resource>

    const query: SelectQueryBuilder<TypeOrmResource> = this.buildResourceQueryBuilder()
    this.extendQueryWithByProperties(by, query)
    const ormEntity: Nullable<TypeOrmResource> = await query.getOne()

    if (ormEntity) {
      domainEntity = ResourceEntityMapper.toDomainEntity(ormEntity)
    }

    return domainEntity
  }

  public async findResourceList(
    pagination?: TokenPagination
  ): Promise<Resource[]> {
    const query: SelectQueryBuilder<TypeOrmResource> = this.buildResourceQueryBuilder()

    if (pagination) {
      this.extendQueryWithPagination(pagination, query)
    }

    const ormEntity: TypeOrmResource[] = await query.getMany()
    const domainEntities: Resource[] = ResourceEntityMapper.toDomainEntities(ormEntity)

    return domainEntities
  }

  private buildResourceQueryBuilder(): SelectQueryBuilder<TypeOrmResource> {
    return this
      .createQueryBuilder(this.resourceAlias)
      .select()
  }

  private extendQueryWithByProperties(
    by: { id: string },
    query: SelectQueryBuilder<TypeOrmResource>
  ): void {
    if (by.id) {
      query.andWhere(`"${this.resourceAlias}"."id" = :id`, { id: by.id })
    }
  }

  private extendQueryWithPagination(
    pagination: Nullable<TokenPagination>,
    query: SelectQueryBuilder<TypeOrmResource>
  ): void {
    if (pagination === null) {
      return
    }

    query.andWhere(`"${this.resourceAlias}"."id" > :id`, { id: pagination.nextPageToken })
    query.limit(pagination.pageSize)
  }

}
