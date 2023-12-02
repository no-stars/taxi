import { ApiProperty } from '@nestjs/swagger'


export class CreateCarResponseBody {

  @ApiProperty()
  carId: string

  @ApiProperty()
  carModelId: string

  @ApiProperty()
  plateNumber: string

  @ApiProperty()
  releaseYear: number

}
