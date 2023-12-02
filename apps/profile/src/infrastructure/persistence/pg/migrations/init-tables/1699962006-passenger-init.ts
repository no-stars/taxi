import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPassengerTableQuery = `
CREATE TABLE IF NOT EXISTS passengers (
  // Доменные модели обычно создаются из кода и дефолтные в них не используются
  // Неочевидные дефолтные значения чаще запутывают, чем помогают
  passenger_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPassengerTableQuery = `
DROP TABLE IF EXISTS passengers;
`

export class PassengerInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PassengerInit.up')
    return this.pool.query(createPassengerTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PassengerInit.down')
    return this.pool.query(dropPassengerTableQuery)
  }

}
