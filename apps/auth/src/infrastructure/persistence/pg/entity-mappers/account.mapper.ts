import { Account } from '@core/domain/entities/account.entity'
import PgAccountEntity from '@infrastructure/persistence/pg/entities/pg-account.entity'

export default class AccountEntityMapper {

  public static toPgEntity(domainAccount: Account): PgAccountEntity {
    const pgAccount = new PgAccountEntity()

    pgAccount.account_id = domainAccount.getId()
    pgAccount.phone_number = domainAccount.getPhoneNumber()
    pgAccount.email = domainAccount.getEmail()
    pgAccount.created_at = domainAccount.getCreatedAt()
    pgAccount.updated_at = domainAccount.getUpdatedAt()
    pgAccount.deleted_at = domainAccount.getDeletedAt()

    return pgAccount
  }

  public static toPgEntities(domainAccounts: Account[]): PgAccountEntity[] {
    return domainAccounts.map(domainAccount => this.toPgEntity(domainAccount))
  }

  public static toDomainEntity(pgAccount: PgAccountEntity): Account {
    const domainAccount = new Account({
      id: pgAccount.account_id,
      phoneNumber: pgAccount.phone_number,
      email: pgAccount.email,
      createdAt: pgAccount.created_at,
      updatedAt: pgAccount.updated_at,
      deletedAt: pgAccount.deleted_at,
    })

    return domainAccount
  }

  public static toDomainEntities(pgAccounts: PgAccountEntity[]): Account[] {
    return pgAccounts.map(pgAccount => this.toDomainEntity(pgAccount))
  }

}
