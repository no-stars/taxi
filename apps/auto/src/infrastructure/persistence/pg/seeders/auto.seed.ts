import { Pool } from 'pg'
import { PgCarModelRepositoryAdapter } from '@infrastructure/persistence/pg/repository/car-model-repository.adapter'
import {
  PgPriceSegmentRequirementRepositoryAdapter,
} from '@infrastructure/persistence/pg/repository/price-segment-requirement-repository.adapter'
import CarModelRows from '@infrastructure/persistence/pg/seeders/models.json'
import PriceSegmentRequirementRows from '@infrastructure/persistence/pg/seeders/requirements.json'
import { StringUtils } from '@libs/common/utils'

export class AutoSeed {

  private readonly carModelRepo: PgCarModelRepositoryAdapter
  private readonly priceSegmentRequirementRepo: PgPriceSegmentRequirementRepositoryAdapter
  private readonly carModelIds = new Map()

  constructor(private readonly pool: Pool) {
    this.carModelRepo = new PgCarModelRepositoryAdapter(this.pool)
    this.priceSegmentRequirementRepo = new PgPriceSegmentRequirementRepositoryAdapter(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('AutoSeed start')

    await this.seedCarModels()
    await this.seedPriceSegmentRequirements()

    console.log('AutoSeed finished')
  }

  private async seedCarModels() {
    console.log('-AutoSeed.CarModels')

    for (const carModelRow of CarModelRows) {
      const carModel = {
        car_model_id: StringUtils.uuid(),
        car_brand: carModelRow.car_brand,
        model_name: carModelRow.model_name,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      }

      this.carModelIds.set(carModel.model_name, carModel.car_model_id)
      await this.carModelRepo.addCarModel(carModel)
    }
  }

  private async seedPriceSegmentRequirements() {
    console.log('-AutoSeed.PriceSegmentRequirements')

    for (const PriceSegmentRequirementRow of PriceSegmentRequirementRows) {
      const carModel = {
        price_segment_requirement_id: StringUtils.uuid(),
        price_segment: PriceSegmentRequirementRow.price_segment,
        car_model_id: this.carModelIds.get(PriceSegmentRequirementRow.car_model_id),
        min_year: PriceSegmentRequirementRow.min_year,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      }

      await this.priceSegmentRequirementRepo.addPriceSegmentRequirement(carModel)
    }
  }

}
