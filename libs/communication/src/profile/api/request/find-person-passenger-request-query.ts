import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class FindPersonPassengerRequestQuery {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  accountId: string

}
