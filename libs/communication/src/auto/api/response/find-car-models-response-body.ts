import { ApiProperty } from '@nestjs/swagger'


class CarModelDto {

  @ApiProperty()
  carModelId: string

  @ApiProperty()
  carBrand: string

  @ApiProperty()
  modelName: string

}

export class FindCarModelsResponseBody {

  @ApiProperty({ type: [CarModelDto] })
  models: CarModelDto[]

}
