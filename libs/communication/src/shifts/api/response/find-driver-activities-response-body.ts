import { ApiProperty } from '@nestjs/swagger'


export class CreateDriverActivityResponseBody {

  @ApiProperty()
  carId: string

  @ApiProperty()
  carModelId: string

  @ApiProperty()
  plateNumber: string

  @ApiProperty()
  releaseYear: number

}
