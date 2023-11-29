import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


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

  public async up(): Promise<void> {
    console.log('PriceSegmentRequirementRelations.up')
    await this.pool.query(createPriceSegmentRequirementRelationsQuery)
  }

  public async down(): Promise<void> {
    console.log('PriceSegmentRequirementRelations.down')
    await this.pool.query(dropPriceSegmentRequirementRelationsQuery)
  }

}
