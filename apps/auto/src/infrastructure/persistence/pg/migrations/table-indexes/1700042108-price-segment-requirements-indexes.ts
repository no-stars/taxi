import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createPriceSegmentRequirementIndexesQuery = `
CREATE INDEX idx_price_segment_requirements_car_model_id_min_year
  ON price_segment_requirements (car_model_id, min_year);
`

const dropPriceSegmentRequirementIndexesQuery = `
DROP INDEX idx_price_segment_requirements_car_model_id_min_year;
`

export class PriceSegmentRequirementIndexes implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PriceSegmentRequirementIndexes.up')
    return await this.pool.query(createPriceSegmentRequirementIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('PriceSegmentRequirementIndexes.down')
    return await this.pool.query(dropPriceSegmentRequirementIndexesQuery)
  }

}
