import type BaseCar from './BaseCar'

import CityBeeLogo from '$lib/Images/citybee.svg'
import type { SvelteComponent } from 'svelte'
import CityBeeCarPopover from '$lib/Popovers/CityBeeCarPopover.svelte'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import { Provider } from '../Types/Enums/Provider'

class CityBeeCar implements BaseCar {
  readonly carData: ICarCityBee
  markers: google.maps.marker.AdvancedMarkerElement[]
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarCityBee) {
    this.carData = car
    this.markers = []
  }

  /**
   * @inheritdoc
   */
  getName(): string {
    return this.carData.name
  }

  /**
   * @inheritdoc
   */
  getProvider(): string {
    return Provider.CITYBEE
  }

  calculateRentTotalPrice(): void {
    //this.rentTotalPrice = calculateCityBeePrice(this.carData, searchParamsObj)
    this.rentTotalPrice = 100
  }

  /**
   * @inheritdoc
   */
  getTotalPrice(): number {
    if (this.rentTotalPrice == undefined)
      throw 'Car total rent price is not calculated'
    return this.rentTotalPrice
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice(): string {
    return this.getTotalPrice().toFixed(2) + ' €'
  }

  /**
   * @inheritdoc
   */
  getFormattedLongTermDiscount(): string {
    return 'TODO'
    // return ( this.getTotalPrice() - this.carData.price.minute * searchParamsObj.minutes ).toFixed(2) + " €";
  }

  /**
   * @inheritdoc
   */
  getFormattedMinutePrice(): string {
    return this.carData.price.minute + ' min'
  }

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {
    return this.carData.price.km + ' km'
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return CityBeeLogo
  }

  getCarImg(): string {
    return this.carData.imageUrl
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent; props: object } {
    return {
      component: CityBeeCarPopover,
      props: {
        minimumFee: this.carData.price.min,
        startingFee: this.carData.price.start,
      },
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ) {
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const content = this.getMarkerRegularIcon()
      const position = { lat, lng } as google.maps.LatLngLiteral

      const marker = new AdvancedMarkerElement({
        map,
        content,
        position,
      })

      this.markers.push(marker)
    })
  }

  setMarkerIcons(type?: string) {
    this.markers.forEach((marker) => {
      switch (type) {
        case 'price':
          marker.content = this.getMarkerPriceIcon()
          break

        default:
          marker.content = this.getMarkerRegularIcon()
          break
      }
    })
  }

  getMarkerRegularIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-citybee'

    return content
  }

  getMarkerPriceIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-citybee'

    const priceIcon = document.createElement('div')
    priceIcon.className = 'price-icon'

    priceIcon.innerText = 10 + '€'
    priceIcon.appendChild(content)

    return priceIcon
  }
}

export default CityBeeCar
