import type BaseCar from './BaseCar'

import BoltLogo from '$lib/Images/bolt.png'
import type { SvelteComponent } from 'svelte'
import BoltCarPopover from '$lib/Popovers/BoltCarPopover.svelte'
import calculateBoltPrice from '../../helpers/Calculators/CalculateBoltPrice'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'
import { Provider } from '../Types/Enums/Provider'

class BoltCar implements BaseCar {
  readonly carData: ICarBolt
  markers: google.maps.marker.AdvancedMarkerElement[]
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarBolt) {
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
    return Provider.BOLT
  }

  /**
   * @inheritdoc
   */
  calculateRentTotalPrice(): void {
    this.rentTotalPrice = calculateBoltPrice(this.carData)
  }

  /**
   * @inheritdoc
   */
  getTotalPrice(): number {
    return (this.rentTotalPrice = calculateBoltPrice(this.carData))
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
    const price = this.carData.price.minute
    return price + ' min'
  }

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {
    const price = this.carData.price.km
    return price + ' km'
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return BoltLogo
  }

  getCarImg(): string {
    return this.carData.imageUrl
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent; props: object } {
    return {
      component: BoltCarPopover,
      props: {
        minimumFee: this.carData.price.min,
      },
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ) {
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const content = document.createElement('div')
      content.className = 'dot-icon bg-brand-bolt'

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
    content.className = 'dot-icon bg-brand-bolt'

    return content
  }

  getMarkerPriceIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = 'dot-icon bg-brand-bolt'

    const priceIcon = document.createElement('div')
    priceIcon.className = 'price-icon'

    priceIcon.innerText = this.getTotalPrice().toFixed(0) + '€'
    priceIcon.appendChild(content)

    return priceIcon
  }
}

export default BoltCar
