import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createCarRelationsQuery = `
ALTER TABLE cars
    ADD CONSTRAINT cars_car_model_id_fkey FOREIGN KEY (car_model_id)
    REFERENCES car_models (car_model_id);
`

const dropCarRelationsQuery = `
ALTER TABLE cars DROP CONSTRAINT cars_car_model_id_fkey;
`

export class CarRelations implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('CarRelations.up')
    return await this.pool.query(createCarRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('CarRelations.down')
    return await this.pool.query(dropCarRelationsQuery)
  }

}
