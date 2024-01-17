import { ApiProperty } from '@nestjs/swagger'


export class ValidateTokenResponseBody {

  @ApiProperty()
  sub: string

  @ApiProperty()
  iat: number

}
