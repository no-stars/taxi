import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreatePassengerRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  accountId: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  firstName: string

}
