import { ApiProperty } from '@nestjs/swagger'


class CarDto {

  @ApiProperty()
  carId: string

  @ApiProperty()
  carModelId: string

  @ApiProperty()
  plateNumber: string

  @ApiProperty()
  releaseYear: number

}

export class FindDriverCarsResponseBody {

  @ApiProperty({ type: [CarDto] })
  cars: CarDto[]

}
