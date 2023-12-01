import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class FindPersonDriverRequestParam {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  personId: string

}
