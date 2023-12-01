import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class SignUpRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  phoneNumber: string

}
