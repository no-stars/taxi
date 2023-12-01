import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateSavedAddressRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  addressName: string

  @IsNumber()
  @ApiProperty({ type: 'number', required: true })
  latitude: number

  @IsNumber()
  @ApiProperty({ type: 'number', required: true })
  longitude: number

}
