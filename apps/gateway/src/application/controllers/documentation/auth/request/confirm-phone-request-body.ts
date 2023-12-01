import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class ConfirmPhoneRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  phoneNumber: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  code: string

}
