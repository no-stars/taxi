import { IsOptional, IsNumberString, IsString } from 'class-validator'
import { ApiQuery } from '@nestjs/swagger'

export class TokenPaginationResponseBody {

  @IsString()
  @IsOptional()
  next_page_token: string

  @IsNumberString()
  @IsOptional()
  page_size: number

  @IsNumberString()
  @IsOptional()
  total_pages: number

  @IsNumberString()
  @IsOptional()
  total: number

}
