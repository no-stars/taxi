import { Logger, Controller, Post, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common'
import { ApiBody, ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import {
  CreateCarRequestBody,
  FindCarModelsRequestParam,
  FindDriverCarsRequestParam,
  CreateCarResponseBody,
  FindBrandsResponseBody,
  FindCarModelsResponseBody,
  FindDriverCarsResponseBody,
} from '@libs/communication/auto/api'


@ApiTags('auto')
@Controller('auto')
export class AutoController {

  private readonly logger = new Logger(AutoController.name)

  constructor() {}

  @Post('cars')
  @ApiOperation({ summary: 'Зарегистрировать автомобиль' })
  @ApiBody({ type: CreateCarRequestBody })
  @ApiResponse({ status: 201, type: CreateCarResponseBody })
  async createCar(@Body() body: CreateCarRequestBody): Promise<CreateCarResponseBody> {
    this.logger.log('createCar')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('brands')
  @ApiOperation({ summary: 'Получить список автомобильных брендов' })
  @ApiResponse({ status: 200, type: FindBrandsResponseBody })
  async findBrands(): Promise<FindBrandsResponseBody> {
    this.logger.log('findBrands')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('brands/:brandId/models')
  @ApiOperation({ summary: 'Получить список моделей авто' })
  @ApiResponse({ status: 200, type: FindCarModelsResponseBody })
  async findBrandModels(
    @Param() param: FindCarModelsRequestParam
  ): Promise<FindCarModelsResponseBody> {
    this.logger.log('findBrandModels')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

  @Get('drivers/:driverId/cars')
  @ApiOperation({ summary: 'Получить список авто водителя' })
  @ApiResponse({ status: 200, type: FindDriverCarsResponseBody })
  async findDriverCars(
    @Param() param: FindDriverCarsRequestParam
  ): Promise<FindDriverCarsResponseBody> {
    this.logger.log('findDriverCars')
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }

}
