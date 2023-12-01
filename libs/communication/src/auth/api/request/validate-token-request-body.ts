import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class ValidateTokenRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  accessToken: string

}
