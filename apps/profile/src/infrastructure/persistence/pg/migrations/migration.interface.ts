
export default interface MigrationInterface {
  up(): Promise<any>
  down(): Promise<any>
}
