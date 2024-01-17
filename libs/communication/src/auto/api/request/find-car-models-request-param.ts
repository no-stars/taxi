import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class FindCarModelsRequestParam {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  brandId: string

}
