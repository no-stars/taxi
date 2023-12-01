import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Optional } from '../../../../../common/src/types/optional'


export class FindPersonRequestQuery {

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  passengerId: Optional<string>

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  driverId: Optional<string>

}
