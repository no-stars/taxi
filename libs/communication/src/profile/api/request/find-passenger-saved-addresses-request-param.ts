import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class FindPassengerSavedAddressesRequestParam {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  passengerId: string

}
