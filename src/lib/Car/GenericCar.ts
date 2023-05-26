import type BoltCar from './BoltCar'
import type CityBeeCar from './CityBeeCar'
import type ElmoCar from './ElmoCar'
import type BeastCar from './BeastCar'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'
import type { ICarBeast } from '$lib/Types/Interfaces/ICarBeast'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'
import type { Provider } from '$lib/Types/Enums/Provider'

export type CarData = ICarBolt | ICarCityBee | ICarElmo | ICarBeast
export type Car = BoltCar | CityBeeCar | ElmoCar | BeastCar

/**
 * Defines a standard format for each company car so
 * prices can be easily compared.
 */
export default abstract class GenericCar<
  CarDataType extends CarData = CarData
> {
  rentTotalPrice: number = 0

  /**
   * Initialise Car with data.
   *
   * @param provider The car provider
   * @param carData The raw car data
   */
  constructor(readonly provider: Provider, readonly carData: CarDataType) {}

  /**
   * Get the car model name.
   */
  public getName(): string {
    return this.carData.name
  }

  /**
   * The total rent price.
   */
  public getTotalPrice(): number {
    return this.rentTotalPrice
  }

  /**
   * Formatted total rent price to two decimal points with currency symbol.
   */
  public getFormattedTotalPrice(): string {
    return this.getTotalPrice().toFixed(2) + ' €'
  }

  /**
   * The minute price as formatted text.
   */
  public getFormattedMinutePrice(): string {
    return this.carData.price.minute + ' min'
  }

  /**
   * The kilometre price as formatted text.
   */
  public getFormattedKilometrePrice(): string {
    return this.carData.price.km + ' km'
  }

  /**
   * Calculating total price
   *
   * @returns The price.
   * @param searchParamsObj
   */
  abstract calculateRentTotalPrice(): void

  /**
   * Get the logo.
   */
  abstract getLogo(): string

  /**
   * Get the logo.
   */
  abstract getCarImg(): string

  /**
   * Initialise the markers.
   */
  abstract initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void
}
