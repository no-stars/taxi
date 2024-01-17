import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class FindDriverCarsRequestParam {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  driverId: string

}
