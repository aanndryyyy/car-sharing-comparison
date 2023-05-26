import type { SvelteComponent } from 'svelte'
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
  rentTotalPrice?: number

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
   * Get the provider name.
   */
  public getProvider(): Provider {
    return this.provider
  }

  /**
   * Formatted total rent price to two decimal points with currency symbol.
   */
  public getFormattedTotalPrice(): string {
    return this.getTotalPrice().toFixed(2) + ' €'
  }

  /**
   * Calculating total price
   *
   * @returns The price.
   * @param searchParamsObj
   */
  abstract calculateRentTotalPrice(): void

  /**
   * The total price in number format, for sorting
   *
   *
   * @returns The price.
   */
  abstract getTotalPrice(): number

  /**
   * The minute price as formatted text.
   *
   * @returns Formatted price.
   */
  abstract getFormattedMinutePrice(): string

  /**
   * The kilometre price as formatted text.
   *
   * @returns Formatted price.
   */
  abstract getFormattedKilometrePrice(): string

  /**
   * Get the logo.
   */
  abstract getLogo(): string

  /**
   * Get the logo.
   */
  abstract getCarImg(): string

  /**
   * The more info dialog component.
   */
  abstract getDetailedDialog(): {
    component: typeof SvelteComponent
    props: object
  }

  /**
   * Initialise the markers.
   */
  abstract initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void
}
