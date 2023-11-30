import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


const createPriceSegmentRequirementRelationsQuery = `
ALTER TABLE price_segment_requirements
    ADD CONSTRAINT price_segment_requirements_car_model_id_fkey FOREIGN KEY (car_model_id)
    REFERENCES car_models (car_model_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
`

const dropPriceSegmentRequirementRelationsQuery = `
ALTER TABLE price_segment_requirements DROP CONSTRAINT IF EXISTS price_segment_requirements_car_model_id_fkey;
`

export class PriceSegmentRequirementRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public up(): Promise<QueryResult> {
    console.log('PriceSegmentRequirementRelations.up')
    return this.pool.query(createPriceSegmentRequirementRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('PriceSegmentRequirementRelations.down')
    return this.pool.query(dropPriceSegmentRequirementRelationsQuery)
  }

}
