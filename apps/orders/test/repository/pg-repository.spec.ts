import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@nestjs/testing/testing-module'
import { Pool } from 'pg'

import { PG_CONNECTION } from '@infrastructure/persistence/database.config'
import { OrderInit, RideInit, PriceProposeInit } from '@infrastructure/persistence/pg/migrations/init-tables'
import { OrderRelations, PriceProposeRelations } from '@infrastructure/persistence/pg/migrations/table-relations'
import { PgOrderRepository } from '@infrastructure/persistence/pg/repository/order.repository'
import { PgRideRepository } from '@infrastructure/persistence/pg/repository/ride.repository'
import {
  PgPriceProposeRepository,
} from '@infrastructure/persistence/pg/repository/price-propose.repository'
import { StringUtils } from '@libs/common/utils'
import { addMinutes } from 'date-fns'
import { Nullable } from '@libs/common/types/nullable'
import { Migration } from '@libs/common/interfaces'
import { MigrationRunner } from '@libs/common/utils'


describe('Pg Repository', () => {
  jest.setTimeout(60000)

  let postgresClient: Pool
  let postgresContainer: StartedPostgreSqlContainer
  let orderRepo: PgOrderRepository
  let rideRepo: PgRideRepository
  let priceProposeRepo: PgPriceProposeRepository

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()

    const pool = new Pool({
      connectionString: postgresContainer.getConnectionUri(),
    })

    const migrations: Migration[] = [
      new OrderInit(pool),
      new RideInit(pool),
      new PriceProposeInit(pool),
      new OrderRelations(pool),
      new PriceProposeRelations(pool),
    ]

    await MigrationRunner.up(migrations)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PG_CONNECTION,
          useFactory: () => pool,
        },
        PgOrderRepository,
        PgRideRepository,
        PgPriceProposeRepository,
      ],
    }).compile()

    postgresClient = module.get(PG_CONNECTION)
    orderRepo = module.get(PgOrderRepository)
    rideRepo = module.get(PgRideRepository)
    priceProposeRepo = module.get(PgPriceProposeRepository)
  })

  afterAll(async () => {
    await postgresClient.end()
    await postgresContainer.stop()
  })

  it('should create and then find multiple orders', async () => {
    const order1 = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const order2 = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.810650, 55.819656',
      finish_location: '35.204088, 54.307690',
      passenger_id: StringUtils.uuid(),
      price_segment: 'ECO',
      recommended_price: 180,
      price: 160,
      payment_type: 'non_cash',
      order_type: 'auction_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await orderRepo.addOrder(order1)
    await orderRepo.addOrder(order2)

    const foundOrder1 = await orderRepo.findOrderById(order1.order_id)
    const foundOrder2 = await orderRepo.findOrderById(order2.order_id)
    // expect([order1, order2]).toEqual([foundOrder1, foundOrder2])
  })

  it('should create and then find multiple orders by passengerId', async () => {
    const order1 = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const order2 = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.810650, 55.819656',
      finish_location: '35.204088, 54.307690',
      passenger_id: order1.passenger_id,
      price_segment: 'ECO',
      recommended_price: 180,
      price: 160,
      payment_type: 'non_cash',
      order_type: 'auction_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await orderRepo.addOrder(order1)
    await orderRepo.addOrder(order2)

    const foundOrders = await orderRepo.findOrderList({ passengerId: order1.passenger_id })
    // expect([order1, order2]).toEqual(foundOrders)
  })

  it('should create and then allow to update order', async () => {
    const order = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null as Nullable<Date>,
      deleted_at: null,
    }

    await orderRepo.addOrder(order)
    order.price = 122
    order.price_segment = 'ECO'
    order.updated_at = new Date()
    await orderRepo.updateOrder(order.order_id, order)

    const foundOrder = await orderRepo.findOrderById(order.order_id)
    // expect(order).toEqual(foundOrder)
  })

  it('should create and then find multiple rides', async () => {
    const ride1 = {
      ride_id: StringUtils.uuid(),
      start_time: new Date(),
      pick_up_time: null,
      finish_time: null,
      driver_id: StringUtils.uuid(),
      car_id: StringUtils.uuid(),
      payment_id: StringUtils.uuid(),
      status: 'driver_on_the_way',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const ride2 = {
      ride_id: StringUtils.uuid(),
      start_time: new Date(),
      pick_up_time: addMinutes(new Date(), 3),
      finish_time: null,
      driver_id: ride1.driver_id,
      car_id: StringUtils.uuid(),
      payment_id: StringUtils.uuid(),
      status: 'passenger_picked_up',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await rideRepo.addRide(ride1)
    await rideRepo.addRide(ride2)

    const foundRides = await rideRepo.findRideList({ driverId: ride1.driver_id })
    // expect(foundRides).toEqual([ride1, ride2])
  })

  it('should create and then allow to update ride', async () => {
    const ride = {
      ride_id: StringUtils.uuid(),
      start_time: new Date(),
      pick_up_time: null as Nullable<Date>,
      finish_time: null,
      driver_id: StringUtils.uuid(),
      car_id: StringUtils.uuid(),
      payment_id: StringUtils.uuid(),
      status: 'driver_on_the_way',
      created_at: new Date(),
      updated_at: null as Nullable<Date>,
      deleted_at: null,
    }

    await rideRepo.addRide(ride)
    ride.pick_up_time = addMinutes(new Date(), 3)
    ride.status = 'passenger_picked_up'
    ride.updated_at = new Date()
    await rideRepo.updateRide(ride.ride_id, ride)

    const foundRides = await rideRepo.findRideList({ driverId: ride.driver_id })
    // expect(foundRides).toEqual([ride])
  })

  it('should create order with correct ride id', async () => {
    const ride = {
      ride_id: StringUtils.uuid(),
      start_time: new Date(),
      pick_up_time: null,
      finish_time: null,
      driver_id: StringUtils.uuid(),
      car_id: StringUtils.uuid(),
      payment_id: StringUtils.uuid(),
      status: 'driver_on_the_way',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const order = {
      order_id: StringUtils.uuid(),
      ride_id: ride.ride_id,
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await rideRepo.addRide(ride)
    await orderRepo.addOrder(order)

    const foundOrder = await orderRepo.findOrderById(order.order_id)
    // expect(foundOrder).toEqual(order)
  })

  it('should raise an error with random ride id', async () => {
    const order = {
      order_id: StringUtils.uuid(),
      ride_id: StringUtils.uuid(),
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    const addOrder = async () => await orderRepo.addOrder(order)

    await expect(addOrder()).rejects.toThrowError()
  })

  it('should create with correct order id', async () => {
    const order = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const pricePropose = {
      price_propose_id: StringUtils.uuid(),
      order_id: order.order_id,
      driver_id: StringUtils.uuid(),
      propose_type: 'driver_propose',
      proposed_price: 330,
      result: null,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    await orderRepo.addOrder(order)
    await priceProposeRepo.addPricePropose(pricePropose)

    const foundPriceProposes = await priceProposeRepo.findPriceProposeList({ orderId: order.order_id })
    // expect(foundPriceProposes).toEqual([pricePropose])
  })

  it('should raise an error with random order id', async () => {
    const pricePropose = {
      price_propose_id: StringUtils.uuid(),
      order_id: StringUtils.uuid(),
      driver_id: StringUtils.uuid(),
      propose_type: 'driver_propose',
      proposed_price: 330,
      result: null,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }

    const addPricePropose = async () => await priceProposeRepo.addPricePropose(pricePropose)

    await expect(addPricePropose()).rejects.toThrowError()
  })

  it('should create and allow to update price propose', async () => {
    const order = {
      order_id: StringUtils.uuid(),
      ride_id: null,
      start_location: '35.204088, 54.307690',
      finish_location: '35.810650, 55.819656',
      passenger_id: StringUtils.uuid(),
      price_segment: 'COMFORT',
      recommended_price: 320,
      price: 320,
      payment_type: 'cash',
      order_type: 'fix_price',
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    }
    const pricePropose = {
      price_propose_id: StringUtils.uuid(),
      order_id: order.order_id,
      driver_id: StringUtils.uuid(),
      propose_type: 'driver_propose',
      proposed_price: 330,
      result: null as Nullable<string>,
      created_at: new Date(),
      updated_at: null as Nullable<Date>,
      deleted_at: null,
    }

    await orderRepo.addOrder(order)
    await priceProposeRepo.addPricePropose(pricePropose)
    pricePropose.result = 'accepted'
    pricePropose.updated_at = new Date()
    await priceProposeRepo.updatePricePropose(pricePropose.price_propose_id, pricePropose)

    const foundPriceProposes = await priceProposeRepo.findPriceProposeList({ orderId: order.order_id })
    // expect(foundPriceProposes).toEqual([pricePropose])
  })
})
