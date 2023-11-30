import { Migration } from '@libs/common/interfaces'
import { Pool, QueryResult } from 'pg'


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

  public up(): Promise<QueryResult> {
    console.log('CarRelations.up')
    return this.pool.query(createCarRelationsQuery)
  }

  public down(): Promise<QueryResult> {
    console.log('CarRelations.down')
    return this.pool.query(dropCarRelationsQuery)
  }

}
