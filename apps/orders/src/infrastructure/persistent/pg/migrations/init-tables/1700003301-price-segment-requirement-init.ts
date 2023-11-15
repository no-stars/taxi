import MigrationInterface from '@infrastructure/persistent/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createPriceSegmentRequirementTableQuery = `
CREATE TABLE IF NOT EXISTS price_segment_requirements (
  price_segment_requirement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  price_segment TEXT NOT NULL,
  car_model_id UUID NOT NULL,
  min_year INTEGER,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
`

const dropPriceSegmentRequirementTableQuery = `
DROP TABLE price_segment_requirements;
`

export class PriceSegmentRequirementInit implements MigrationInterface {

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
