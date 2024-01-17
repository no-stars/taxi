import { NestExpressApplication } from '@nestjs/platform-express'
import { Test, TestingModule } from '@nestjs/testing'
import { Pool } from 'pg'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Migration } from '../../../common/src/interfaces'
import { MigrationRunner } from '../../../common/src/utils'

type MigrationConstructor = new (pool: Pool) => Migration

export interface TestServerOptions {
  dbConnectionToken: symbol
  setupMigrations?: MigrationConstructor[]
}

export class TestServer {

  constructor(
    public readonly serverApplication: NestExpressApplication,
    public readonly dbConnection: Pool,
    public readonly testingModule: TestingModule,
    private readonly dbContainer: StartedPostgreSqlContainer
  ) {}

  public static async new(root: any, options: TestServerOptions): Promise<TestServer> {
    const postgresContainer = await new PostgreSqlContainer().start()
    const pool = new Pool({ connectionString: postgresContainer.getConnectionUri() })

    const testingModule: TestingModule = await Test
      .createTestingModule({
        imports: [root],
      })
      .overrideProvider(options.dbConnectionToken)
      .useValue(pool)
      .compile()

    const dbConnection: Pool = testingModule.get(options.dbConnectionToken)
    const serverApplication: NestExpressApplication = testingModule.createNestApplication()

    const testServer = new TestServer(serverApplication, dbConnection, testingModule, postgresContainer)

    if (options.setupMigrations) {
      await testServer.runMigrations(options.setupMigrations)
    }

    return testServer
  }

  public async stop(): Promise<void> {
    await this.dbConnection.end()
    await this.dbContainer.stop()
    await this.serverApplication.close()
  }

  private async runMigrations(migrations: MigrationConstructor[]): Promise<void> {
    const migrationInstances: Migration[] = migrations.map(migration => new migration(this.dbConnection))

    const runner = new MigrationRunner(migrationInstances)
    await runner.up()
  }

}
