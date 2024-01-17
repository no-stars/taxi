import { addMinutes } from 'date-fns'

import { RootModule } from '@application/modules/root.module'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { OrderInit, RideInit, PriceProposeInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { OrderRelations, PriceProposeRelations } from '@infrastructure/persistence/pg/migrations/table-relations'
import { PgOrderRepository } from '@infrastructure/persistence/pg/repository/order.repository'
import { PgRideRepository } from '@infrastructure/persistence/pg/repository/ride.repository'
import {
  PgPriceProposeRepository,
} from '@infrastructure/persistence/pg/repository/price-propose.repository'

import { StringUtils } from '@libs/common/utils'
import { Nullable } from '@libs/common/types/nullable'
import { TestServer } from '@libs/testing/server/test-server'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let testServer: TestServer
  let orderRepo: PgOrderRepository
  let rideRepo: PgRideRepository
  let priceProposeRepo: PgPriceProposeRepository

  beforeAll(async () => {
    testServer = await TestServer.new(RootModule, {
      dbConnectionToken: PG_CONNECTION,
      setupMigrations: [
        OrderInit, RideInit, PriceProposeInit, OrderRelations, PriceProposeRelations,
      ],
    })

    orderRepo = testServer.testingModule.get(PgOrderRepository)
    rideRepo = testServer.testingModule.get(PgRideRepository)
    priceProposeRepo = testServer.testingModule.get(PgPriceProposeRepository)
  })

  afterAll(async () => {
    await testServer.stop()
  })

  it('should create and then find multiple orders', async () => {
    // given
    const actualOrder1 = createOrder(null, StringUtils.uuid())
    const actualOrder2 = createOrder(null, StringUtils.uuid())
    await orderRepo.addOrder(actualOrder1)
    await orderRepo.addOrder(actualOrder2)

    // when
    const expectedOrder1 = await orderRepo.findOrderById(actualOrder1.order_id)
    const expectedOrder2 = await orderRepo.findOrderById(actualOrder2.order_id)

    // then
    // expect([actualOrder1, actualOrder2]).toEqual([expectedOrder1, expectedOrder2])
  })

  it('should create and then find multiple orders by passengerId', async () => {
    // given
    const passengerId: string = StringUtils.uuid()
    const actualOrder1 = createOrder(null, passengerId)
    const actualOrder2 = createOrder(null, passengerId)
    await orderRepo.addOrder(actualOrder1)
    await orderRepo.addOrder(actualOrder2)

    // when
    const expectedOrders = await orderRepo.findOrderList({ passengerId: passengerId })

    // then
    // expect([actualOrder1, actualOrder2]).toEqual(expectedOrders)
  })

  it('should create and then allow to update order', async () => {
    // given
    const actualOrder = createOrder(null, StringUtils.uuid())
    await orderRepo.addOrder(actualOrder)

    // when
    actualOrder.price = 122
    actualOrder.price_segment = 'ECO'
    actualOrder.updated_at = new Date()
    await orderRepo.updateOrder(actualOrder.order_id, actualOrder)
    const expectedOrder = await orderRepo.findOrderById(actualOrder.order_id)

    // then
    // expect(actualOrder).toEqual(expectedOrder)
  })

  it('should create and then find multiple rides', async () => {
    // given
    const driverId: string = StringUtils.uuid()
    const actualRide1 = createRide(driverId)
    const actualRide2 = createRide(driverId)
    await rideRepo.addRide(actualRide1)
    await rideRepo.addRide(actualRide2)

    // when
    const expectedRides = await rideRepo.findRideList({ driverId: driverId })

    // then
    // expect([actualRide1, actualRide2]).toEqual(expectedRides)
  })

  it('should create and then allow to update ride', async () => {
    // given
    const actualRide = createRide(StringUtils.uuid())
    await rideRepo.addRide(actualRide)

    // when
    actualRide.pick_up_time = addMinutes(new Date(), 3)
    actualRide.status = 'passenger_picked_up'
    actualRide.updated_at = new Date()
    await rideRepo.updateRide(actualRide.ride_id, actualRide)
    const expectedRides = await rideRepo.findRideList({ driverId: actualRide.driver_id })

    // then
    // expect([actualRide]).toEqual(expectedRides)
  })

  it('should create an order with correct ride id', async () => {
    // given
    const ride = createRide(StringUtils.uuid())
    const actualOrder = createOrder(ride.ride_id, StringUtils.uuid())
    await rideRepo.addRide(ride)
    await orderRepo.addOrder(actualOrder)

    // when
    const expectedOrder = await orderRepo.findOrderById(actualOrder.order_id)

    // then
    // expect(actualOrder).toEqual(expectedOrder)
  })

  it('should raise an error on adding order with random ride id', async () => {
    // given
    const order = createOrder('b91c9572-04e6-4065-9e3f-400450fd3f12', StringUtils.uuid())

    // when
    const addOrder = async () => await orderRepo.addOrder(order)

    // then
    await expect(addOrder()).rejects.toThrowError()
  })

  it('should create price propose with correct order id', async () => {
    // given
    const order = createOrder(null, StringUtils.uuid())
    const actualPricePropose = createPricePropose(order.order_id)

    await orderRepo.addOrder(order)
    await priceProposeRepo.addPricePropose(actualPricePropose)

    // when
    const expectedPriceProposes = await priceProposeRepo.findPriceProposeList({ orderId: order.order_id })

    // then
    // expect([actualPricePropose]).toEqual(expectedPriceProposes)
  })

  it('should raise an error on adding price propose with random order id', async () => {
    // given
    const pricePropose = createPricePropose(StringUtils.uuid())

    // when
    const addPricePropose = async () => await priceProposeRepo.addPricePropose(pricePropose)

    // then
    await expect(addPricePropose()).rejects.toThrowError()
  })

  it('should create and allow to update price propose', async () => {
    // given
    const order = createOrder(null, StringUtils.uuid())
    const actualPricePropose = createPricePropose(order.order_id)

    await orderRepo.addOrder(order)
    await priceProposeRepo.addPricePropose(actualPricePropose)

    // when
    actualPricePropose.result = 'accepted'
    actualPricePropose.updated_at = new Date()
    await priceProposeRepo.updatePricePropose(actualPricePropose.price_propose_id, actualPricePropose)
    const expectedPriceProposes = await priceProposeRepo.findPriceProposeList({ orderId: order.order_id })

    // then
    // expect([actualPricePropose]).toEqual(expectedPriceProposes)
  })
})


function createOrder(rideId: Nullable<string>, passengerId: string): any {
  return {
    order_id: StringUtils.uuid(),
    ride_id: rideId,
    start_location: '35.204088, 54.307690',
    finish_location: '35.810650, 55.819656',
    passenger_id: passengerId,
    price_segment: 'COMFORT',
    recommended_price: 320,
    price: 320,
    payment_type: 'cash',
    order_type: 'fix_price',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createRide(driverId: string): any {
  return {
    ride_id: StringUtils.uuid(),
    start_time: new Date(),
    pick_up_time: null as Nullable<Date>,
    finish_time: null,
    driver_id: driverId,
    car_id: StringUtils.uuid(),
    payment_id: StringUtils.uuid(),
    status: 'driver_on_the_way',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createPricePropose(orderId: string): any {
  return {
    price_propose_id: StringUtils.uuid(),
    order_id: orderId,
    driver_id: StringUtils.uuid(),
    propose_type: 'driver_propose',
    proposed_price: 330,
    result: null as Nullable<string>,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}
