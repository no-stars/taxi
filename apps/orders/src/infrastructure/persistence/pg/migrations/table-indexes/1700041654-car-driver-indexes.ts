import MigrationInterface from '@infrastructure/persistence/pg/migrations/migration.interface'
import { Pool } from 'pg'


const createCarDriverIndexesQuery = `
CREATE INDEX idx_car_driver_driver_id_car_id ON car_drivers (driver_id, car_id);
`

const dropCarDriverIndexesQuery = `
DROP INDEX idx_car_driver_driver_id_car_id;
`

export class CarDriverIndexes implements MigrationInterface {

  constructor(private readonly pool: Pool) {}

  public async up(): Promise<any> {
    console.log('CarDriverIndexes.up')
    return await this.pool.query(createCarDriverIndexesQuery)
  }

  public async down(): Promise<any> {
    console.log('CarDriverIndexes.down')
    return await this.pool.query(dropCarDriverIndexesQuery)
  }

}
