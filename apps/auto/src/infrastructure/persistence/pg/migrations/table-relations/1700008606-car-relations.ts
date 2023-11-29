import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createCarRelationsQuery = `
ALTER TABLE cars
    ADD CONSTRAINT cars_car_model_id_fkey FOREIGN KEY (car_model_id)
    REFERENCES car_models (car_model_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
`

const dropCarRelationsQuery = `
ALTER TABLE cars DROP CONSTRAINT IF EXISTS cars_car_model_id_fkey;
`

export class CarRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<void> {
    console.log('CarRelations.up')
    await this.pool.query(createCarRelationsQuery)
  }

  public async down(): Promise<void> {
    console.log('CarRelations.down')
    await this.pool.query(dropCarRelationsQuery)
  }

}
