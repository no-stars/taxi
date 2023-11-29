import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPriceSegmentRequirementIndexesQuery = `
CREATE INDEX IF NOT EXISTS idx_price_segment_requirements_car_model_id_min_year
  ON price_segment_requirements (car_model_id, min_year);
`

const dropPriceSegmentRequirementIndexesQuery = `
DROP INDEX IF EXISTS idx_price_segment_requirements_car_model_id_min_year;
`

export class PriceSegmentRequirementIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('PriceSegmentRequirementIndexes.up')
    await this.pool.query(createPriceSegmentRequirementIndexesQuery)
  }

  public async down(): Promise<void> {
    console.log('PriceSegmentRequirementIndexes.down')
    await this.pool.query(dropPriceSegmentRequirementIndexesQuery)
  }

}
