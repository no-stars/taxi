import { Pool } from 'pg'

export default interface Seed {
  execute(pool: Pool): Promise<void>
}
