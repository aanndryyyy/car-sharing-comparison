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
    content?: Element,
    map?: google.maps.Map
  ) {
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const position = { lat, lng } as google.maps.LatLngLiteral
      const marker = new AdvancedMarkerElement({
        map,
        content,
        position,
      })

      this.markers.push(marker)
    })
  }

  setMarkersMap(map?: google.maps.Map) {
    this.markers.forEach((marker) => {
      marker.map = map
    })
  }
}

export default BoltCar
