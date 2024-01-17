import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateDriverActivityRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  driverId: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  carModelId: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  plateNumber: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number', required: true })
  releaseYear: number

}
