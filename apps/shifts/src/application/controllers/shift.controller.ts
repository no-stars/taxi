import { Logger, Controller, Post, Body, HttpException, HttpStatus, Get, Query, Param } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import {
  CreatePassengerRequestBody,
  CreatePassengerResponseBody,
  CreateDriverRequestBody,
  CreateDriverResponseBody,
  CreateSavedAddressRequestBody,
  CreateSavedAddressRequestParam,
  CreateSavedAddressResponseBody,
  FindPersonPassengerRequestParam,
  FindPersonPassengerRequestQuery,
  FindPersonPassengerResponseBody,
  FindPersonDriverRequestParam,
  FindPersonDriverRequestQuery,
  FindPersonDriverResponseBody,
  FindPersonRequestQuery,
  FindPersonResponseBody,
  FindPassengerSavedAddressesRequestParam,
  FindPassengerSavedAddressResponseBody,
} from '@libs/communication/profile/api'


@ApiTags('profile')
@Controller('profile')
export class ProfileController {

  private readonly logger = new Logger(ProfileController.name)

  constructor() {}

  @Post('passengers')
  @ApiOperation({ summary: 'Создать пассажира' })
  @ApiBody({ type: CreatePassengerRequestBody })
  @ApiResponse({ status: 201, type: CreatePassengerResponseBody })
  async createPassenger(@Body() body: CreatePassengerRequestBody): Promise<CreatePassengerResponseBody> {
    this.logger.log('createPassenger')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Post('drivers')
  @ApiOperation({ summary: 'Создать водителя' })
  @ApiBody({ type: CreateDriverRequestBody })
  @ApiResponse({ status: 201, type: CreateDriverResponseBody })
  async createDriver(@Body() body: CreateDriverRequestBody): Promise<CreateDriverResponseBody> {
    this.logger.log('createDriver')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Post('passengers/:passengerId/saved_addresses')
  @ApiOperation({ summary: 'Сохранить адрес' })
  @ApiBody({ type: CreateSavedAddressRequestBody })
  @ApiResponse({ status: 201, type: CreateSavedAddressResponseBody })
  async createSavedAddress(
    @Param() params: CreateSavedAddressRequestParam,
    @Body() body: CreateSavedAddressRequestBody
  ): Promise<CreateSavedAddressResponseBody> {
    this.logger.log('createSavedAddress')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('persons/:personId/passengers')
  @ApiOperation({ summary: 'Получить данные пассажира' })
  @ApiResponse({ status: 200, type: FindPersonPassengerResponseBody })
  async findPersonPassenger(
    @Param() params: FindPersonPassengerRequestParam,
    @Query() query: FindPersonPassengerRequestQuery
  ): Promise<FindPersonPassengerResponseBody> {
    this.logger.log('findPersonPassenger')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('persons/:personId/drivers')
  @ApiOperation({ summary: 'Получить данные водителя' })
  @ApiResponse({ status: 200, type: FindPersonDriverResponseBody })
  async findPersonDriver(
    @Param() params: FindPersonDriverRequestParam,
    @Query() query: FindPersonDriverRequestQuery
  ): Promise<FindPersonDriverResponseBody> {
    this.logger.log('findPersonDriver')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('persons')
  @ApiOperation({ summary: 'Получить персональные данные' })
  @ApiResponse({ status: 200, type: FindPersonResponseBody })
  async findPersonList(@Query() query: FindPersonRequestQuery): Promise<FindPersonResponseBody> {
    this.logger.log('findPersonList')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('passengers/:passengerId/saved_addresses')
  @ApiOperation({ summary: 'Получить сохраненные адреса пассажира' })
  @ApiResponse({ status: 200, type: FindPassengerSavedAddressResponseBody })
  async findPassengerSavedAddresses(
    @Param() param: FindPassengerSavedAddressesRequestParam
  ): Promise<FindPassengerSavedAddressResponseBody> {
    this.logger.log('findPassengerSavedAddresses')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

}
