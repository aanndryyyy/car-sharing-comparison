import type BoltCar from './BoltCar'
import type CityBeeCar from './CityBeeCar'
import type ElmoCar from './ElmoCar'
import type BeastCar from './BeastCar'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'
import type { ICarBeast } from '$lib/Types/Interfaces/ICarBeast'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'
import type { Provider } from '$lib/Types/Enums/Provider'
import type { ISearchParamsObj } from '../Types/Interfaces/ISearchParamsObj'
import type { ICarRentPricePackage } from '../Types/Interfaces/ICarRentPricePackage'
import { haversineRaw } from '../../helpers/haversine'

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
  rentUsablePackages: ICarRentPricePackage[] = []
  markers: google.maps.marker.AdvancedMarkerElement[] = []
  closestMarker?: google.maps.marker.AdvancedMarkerElement
  closestMarkerDistance?: number

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
  public getCarData(): CarDataType {
    return this.carData
  }

  /**
   * Get the car model name.
   */
  public getName(): string {
    return this.carData.city === 'Tartu'
      ? this.carData.name + ' (Tartu)'
      : this.carData.name
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
   * @param searchParamsObj
   */
  abstract calculateRentTotalPrice(searchParamsObj: ISearchParamsObj): void

  /**
   *
   *
   * @param type
   */
  public setMarkerIcons(type?: 'price') {
    this.markers.forEach((marker, index) => {
      this.setMarkerIcon(marker, index, type)
    })
  }

  /**
   *
   *
   * @param marker
   * @param index
   * @param type
   */
  abstract setMarkerIcon(
    marker: google.maps.marker.AdvancedMarkerElement,
    index: number,
    type?: string
  ): void

  /**
   *
   *
   * @param lat
   * @param lng
   */
  public findClosestMarkerTo(
    lat: number,
    lng: number
  ): google.maps.marker.AdvancedMarkerElement {
    if (this.markers.length === 0) return null

    this.markers.forEach(
      (marker) =>
        (marker.title = haversineRaw(marker.position, { lat, lng }).toString())
    )
    this.markers.sort(
      (marker1, marker2) => Number(marker1.title) - Number(marker2.title)
    )

    this.closestMarker = this.markers[0]
    this.closestMarkerDistance = Number(this.closestMarker.title)

    return this.closestMarker
  }

  /**
   * Get the logo.
   */
  abstract getLogo(): string

  /**
   * Get the logo.
   */
  abstract getCarImg(): string
}
