import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateDriverRequestBody {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  accountId: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  firstName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  lastName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  middleName: string

}
