import { MigrationAction } from '../constants'
import { Migration } from '../interfaces'
import { Optional } from '../types/optional'


export default class MigrationRunner {

  private static action: Optional<string> = process.argv[2]

  public static async run(migrations: Migration[]): Promise<void> {
    this.throwIfNoArgs()

    if (this.action === MigrationAction.up) {
      await this.up(migrations)
    }

    if (this.action === MigrationAction.down) {
      await this.down(migrations)
    }
  }

  public static async up(migrations: Migration[]): Promise<void> {
    console.log('Start migrations')

    for (const migration of migrations) {
      await migration.up()
    }

    console.log('Finish migrations')
  }

  public static async down(migrations: Migration[]): Promise<void> {
    console.log('Undo migrations')

    for (const migration of migrations.reverse()) {
      await migration.down()
    }

    console.log('Undo migrations')
  }

  private static throwIfNoArgs(): void {
    const isValidArg: boolean = MigrationRunner.validateArg(this.action)

    if (!isValidArg) {
      MigrationRunner.terminate()
    }
  }

  private static validateArg(arg: Optional<string>): boolean {
    return arg === MigrationAction.up || arg === MigrationAction.down
  }

  private static terminate(): void {
    console.log('up/down argument required')
    process.exit(2)
  }

}
