import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPriceSegmentRequirementTableQuery = `
CREATE TABLE IF NOT EXISTS price_segment_requirements (
  price_segment_requirement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  price_segment TEXT NOT NULL,
  car_model_id UUID NOT NULL,
  min_year INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
`

const dropPriceSegmentRequirementTableQuery = `
DROP TABLE IF EXISTS price_segment_requirements;
`

export class PriceSegmentRequirementInit implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PriceSegmentRequirementInit.up')
    return this.pool.query(createPriceSegmentRequirementTableQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PriceSegmentRequirementInit.down')
    return this.pool.query(dropPriceSegmentRequirementTableQuery)
  }

}
