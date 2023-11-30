export default interface Migration {
  up(): Promise<any>
  down(): Promise<any>
}
