import { IsOptional, IsNumberString, IsString } from 'class-validator'
import { ApiQuery } from '@nestjs/swagger'

export class TokenPaginationRequestQuery {

  @IsString()
  @IsOptional()
  next_page_token?: string

  @IsNumberString()
  @IsOptional()
  page_size?: number

}
