import { ApiProperty } from '@nestjs/swagger'


class BrandDto {

  @ApiProperty()
  brandId: string

  @ApiProperty()
  name: string

}

export class FindBrandsResponseBody {

  @ApiProperty({ type: [BrandDto] })
  brands: BrandDto[]

}
