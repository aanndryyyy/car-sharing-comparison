export interface Provider {
  provider: string
  services: Service[]
}

export interface Service {
  serviceId: number
  name: string
  imageUrl?: string
  price: Price
  bodyType?: string
  gearbox?: string
  petFriendly?: boolean
  coordinates: Coordinate[]
  packages?: Package[]
  motorType?: MotorType
  icon?: string
}

export interface Coordinate {
  serviceId: number
  carId: number | string
  lat: number
  lng: number
}

export enum MotorType {
  Electric = 'electric',
  Petrol = 'PETROL',
}

export interface Package {
  km?: number
  minute?: number
  hour?: number
  day?: number
  base?: number
  days?: number
  distance?: number
  price?: number
}

export interface Price {
  km: number
  minute: number
  hour?: number
  day: number
  minimum?: number
  week?: number
  month?: number
  threeDays?: number
  start?: number
  deposit?: Deposit
}

export interface Deposit {
  base: number
  special: number
}
