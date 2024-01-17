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


@ApiTags('shift')
@Controller('shift')
export class ShiftController {

  private readonly logger = new Logger(ShiftController.name)

  constructor() {}

  @Post('shifts/pay')
  @ApiOperation({ summary: 'Создать пассажира' })
  @ApiBody({ type: CreatePassengerRequestBody })
  @ApiResponse({ status: 201, type: CreatePassengerResponseBody })
  async createPassenger(@Body() body: CreatePassengerRequestBody): Promise<CreatePassengerResponseBody> {
    this.logger.log('createPassenger')
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
