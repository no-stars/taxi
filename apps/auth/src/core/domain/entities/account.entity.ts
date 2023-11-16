import { IsDate, IsOptional, IsString } from 'class-validator'

import { StringUtils } from '@libs/common/utils'
import { BaseEntity } from '@libs/common/entities/entity'
import { Nullable } from '@libs/common/types/nullable'


export class Account extends BaseEntity {

  @IsString()
  private readonly phoneNumber: string

  @IsString()
  @IsOptional()
  private readonly email: Nullable<string>

  @IsDate()
  private readonly createdAt: Date

  @IsDate()
  private readonly updatedAt: Date

  @IsDate()
  @IsOptional()
  private readonly deletedAt: Nullable<Date>

  constructor(payload: any) {
    super()

    const now = new Date()

    this.id = payload.id ?? StringUtils.uuid()
    this.phoneNumber = payload.phoneNumber
    this.email = payload.email ?? null
    this.createdAt = payload.createdAt ?? now
    this.updatedAt = payload.updatedAt ?? now
    this.deletedAt = null
  }

  public static new(payload: any): Account {
    const account: Account = new Account(payload)
    account.validate()

    return account
  }

  public getPhoneNumber(): string {
    return this.phoneNumber
  }

  public getEmail(): Nullable<string> {
    return this.email
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getUpdatedAt(): Date {
    return this.updatedAt
  }

  public getDeletedAt(): Nullable<Date> {
    return this.deletedAt
  }

}
