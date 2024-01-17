import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import { PgOrderRepository } from '@infrastructure/persistence/pg/repository/order.repository'
import { PgRideRepository } from '@infrastructure/persistence/pg/repository/ride.repository'
import {
  PgPriceProposeRepository,
} from '@infrastructure/persistence/pg/repository/price-propose.repository'
import { ArrayUtils, NumberUtils, StringUtils } from '@libs/common/utils'
import { Seed } from '@libs/common/interfaces'
import { SEED_COUNT } from '@libs/common/constants'

export class OrderSeed implements Seed {

  private readonly orderRepo: PgOrderRepository
  private readonly rideRepo: PgRideRepository
  private readonly priceProposeRepo: PgPriceProposeRepository
  private readonly rideIds: string[] = []
  private readonly auctionOrderIds: string[] = []
  private readonly errors: Error[] = []

  constructor(private readonly pool: Pool) {
    this.orderRepo = new PgOrderRepository(this.pool)
    this.rideRepo = new PgRideRepository(this.pool)
    this.priceProposeRepo = new PgPriceProposeRepository(this.pool)
  }

  public async execute(): Promise<void> {
    console.log('OrderSeed start')

    await this.seedRides()
    await this.seedOrders()
    await this.seedPriceProposes()

    console.log('OrderSeed finished')
    console.log(`errors: ${this.errors}`)
  }

  private async seedRides(): Promise<void> {
    console.log('-OrderSeed.Ride')

    for (const item of ArrayUtils.range(SEED_COUNT.rides)) {
      const rideData = this.generateRideData()
      try {
        await this.rideRepo.addRide(rideData)
        this.rideIds.push(rideData.ride_id)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private async seedOrders(): Promise<void> {
    console.log('-OrderSeed.Order')

    for (const item of ArrayUtils.range(SEED_COUNT.orders)) {
      const orderData = this.generateOrderData()
      try {
        await this.orderRepo.addOrder(orderData)

        if (orderData.order_type === 'auction_price') {
          this.auctionOrderIds.push(orderData.order_id)
        }
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private async seedPriceProposes(): Promise<void> {
    console.log('-OrderSeed.PricePropose')

    for (const item of ArrayUtils.range(SEED_COUNT.priceProposes)) {
      const priceProposeData = this.generatePriceProposeData()
      try {
        await this.priceProposeRepo.addPricePropose(priceProposeData)
      } catch (err) {
        this.errors.push(err)
      }
    }
  }

  private generateRideData(): any {
    const ALLOWED_RIDE_STATUSES: string[] = ['driver_on_the_way', 'passenger_picked_up', 'done']
    const rideStatus: string = ArrayUtils.randomChoice(ALLOWED_RIDE_STATUSES)

    const startTime = faker.date.recent({ days: 10 })
    const pickUpTime = faker.date.soon({ days: 1, refDate: startTime })
    const finishTime = faker.date.soon({ days: 1, refDate: pickUpTime })

    return {
      ride_id: StringUtils.uuid(),
      start_time: startTime,
      pick_up_time: pickUpTime,
      finish_time: finishTime,
      driver_id: StringUtils.uuid(),
      car_id: StringUtils.uuid(),
      payment_id: StringUtils.uuid(),
      status: rideStatus,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

  private generateOrderData(): any {
    const ALLOWED_ORDER_TYPES: string[] = ['auction_price', 'fix_price']
    const orderType: string = ArrayUtils.randomChoice(ALLOWED_ORDER_TYPES)

    const ALLOWED_PAYMENT_TYPES: string[] = ['cash', 'non_cash']
    const paymentType: string = ArrayUtils.randomChoice(ALLOWED_PAYMENT_TYPES)

    const ALLOWED_PRICE_SEGMENTS: string[] = ['ECO', 'COMFORT', 'COMFORT_PLUS', 'BUSINESS']
    const priceSegment: string = ArrayUtils.randomChoice(ALLOWED_PRICE_SEGMENTS)

    const price: number = NumberUtils.randomInt(200, 700)
    const recommendedPrice: number = NumberUtils.randomInt(200, 700)

    const startLocationList: [latitude: number, longitude: number] = faker.location.nearbyGPSCoordinate()
    const startLocation: string = startLocationList.join(', ')
    const finishLocation: string = faker.location.nearbyGPSCoordinate({
      origin: startLocationList,
      radius: 20,
      isMetric: true,
    }).join(', ')

    const rideId: string = ArrayUtils.randomChoice(this.rideIds)

    return {
      order_id: StringUtils.uuid(),
      ride_id: rideId,
      start_location: startLocation,
      finish_location: finishLocation,
      passenger_id: StringUtils.uuid(),
      price_segment: priceSegment,
      recommended_price: recommendedPrice,
      price,
      payment_type: paymentType,
      order_type: orderType,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

  private generatePriceProposeData(): any {
    const ALLOWED_PROPOSE_RESULTS: string[] = ['accepted', 'declined']
    const priceProposeResult: string = ArrayUtils.randomChoice(ALLOWED_PROPOSE_RESULTS)

    const ALLOWED_PROPOSE_TYPES: string[] = ['driver_propose', 'passenger_propose']
    const priceProposeType: string = ArrayUtils.randomChoice(ALLOWED_PROPOSE_TYPES)

    const proposedPrice: number = NumberUtils.randomInt(200, 700)
    const orderId: string = ArrayUtils.randomChoice(this.auctionOrderIds)

    return {
      price_propose_id: StringUtils.uuid(),
      order_id: orderId,
      driver_id: StringUtils.uuid(),
      propose_type: priceProposeType,
      proposed_price: proposedPrice,
      result: priceProposeResult,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
  }

}
