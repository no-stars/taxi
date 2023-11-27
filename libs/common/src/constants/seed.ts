type SeedCountKey = 'accounts' | 'cars' | 'carDrivers' | 'payments' | 'paymentCards' | 'withdrawCards' | 'passengers'
  | 'drivers' | 'savedAddresses' | 'ratings' | 'shifts' | 'driverActivities' | 'orders' | 'rides' | 'priceProposes'

export const SEED_COUNT: Record<SeedCountKey, number> = {
  accounts: 10,
  cars: 10,
  carDrivers: 10,
  payments: 10,
  paymentCards: 10,
  withdrawCards: 10,
  passengers: 10,
  drivers: 10,
  // persons: 10,
  savedAddresses: 10,
  ratings: 10,
  shifts: 10,
  driverActivities: 10,
  orders: 10,
  rides: 10,
  priceProposes: 10,
}
