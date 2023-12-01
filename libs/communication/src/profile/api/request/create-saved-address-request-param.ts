import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateSavedAddressRequestParam {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  passengerId: string

}
