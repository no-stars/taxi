import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


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

  public async up(): Promise<any> {
    console.log('PriceSegmentRequirementInit.up')
    return await this.pool.query(createPriceSegmentRequirementTableQuery)
  }

  public async down(): Promise<any> {
    console.log('PriceSegmentRequirementInit.down')
    return await this.pool.query(dropPriceSegmentRequirementTableQuery)
  }

}
