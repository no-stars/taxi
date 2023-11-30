import { MigrationAction } from '../constants'
import { Migration } from '../interfaces'


export default class MigrationRunner {

  constructor(private readonly migrations: Migration[]) {}

  public async runStandalone(): Promise<void> {
    const action: string = MigrationRunner.getActionFromArgs()

    if (action === MigrationAction.up) {
      await this.up()
    }

    if (action === MigrationAction.down) {
      await this.down()
    }
  }

  public async up(): Promise<void> {
    console.log('Start migrations')

    for (const migration of this.migrations) {
      await migration.up()
    }

    console.log('Finish migrations')
  }

  public async down(): Promise<void> {
    console.log('Undo migrations')

    for (const migration of this.migrations.reverse()) {
      await migration.down()
    }

    console.log('Undo migrations')
  }

  private static getActionFromArgs(): string {
    const argAction: string = process.argv[2] ?? ''
    MigrationRunner.terminateIfInvalidAction(argAction)
    return argAction
  }

  private static terminateIfInvalidAction(action: string): void {
    const isValidArg: boolean = MigrationRunner.validateAction(action)

    if (!isValidArg) {
      MigrationRunner.terminate('up/down argument required')
    }
  }

  private static validateAction(action: string): boolean {
    return action === MigrationAction.up || action === MigrationAction.down
  }

  private static terminate(message: string): void {
    console.log(message)
    process.exit(2)
  }

}
