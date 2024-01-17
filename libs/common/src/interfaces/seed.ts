export default interface Seed {
  execute(): Promise<void>
}
