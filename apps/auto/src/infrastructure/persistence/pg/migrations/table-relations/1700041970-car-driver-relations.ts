import { Migration } from '@libs/common/interfaces'
import { Pool } from 'pg'


const createCarDriverRelationsQuery = `
ALTER TABLE car_drivers
    ADD CONSTRAINT car_drivers_car_id_fkey FOREIGN KEY (car_id)
    REFERENCES cars (car_id);
`

const dropCarDriverRelationsQuery = `
ALTER TABLE car_drivers DROP CONSTRAINT IF EXISTS car_drivers_car_id_fkey;
`

export class CarDriverRelations implements Migration {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('CarDriverRelations.up')
    return await this.pool.query(createCarDriverRelationsQuery)
  }

  public async down(): Promise<any> {
    console.log('CarDriverRelations.down')
    return await this.pool.query(dropCarDriverRelationsQuery)
  }

}
