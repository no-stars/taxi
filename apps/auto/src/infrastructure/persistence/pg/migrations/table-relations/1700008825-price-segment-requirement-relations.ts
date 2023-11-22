import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPriceSegmentRequirementRelationsQuery = `
ALTER TABLE price_segment_requirements
    ADD CONSTRAINT price_segment_requirements_car_model_id_fkey FOREIGN KEY (car_model_id)
    REFERENCES car_models (car_model_id);
`

const dropPriceSegmentRequirementRelationsQuery = `
ALTER TABLE price_segment_requirements DROP CONSTRAINT price_segment_requirements_car_model_id_fkey;
`

export class PriceSegmentRequirementRelations implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('PriceSegmentRequirementRelations.up')
    return await this.pool.query(createPriceSegmentRequirementRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('PriceSegmentRequirementRelations.down')
    return await this.pool.query(dropPriceSegmentRequirementRelationsQuery)
  }

}
