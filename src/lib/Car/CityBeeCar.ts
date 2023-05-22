import type BaseCar from './BaseCar'

import CityBeeLogo from '$lib/Images/citybee.svg'
import type { SvelteComponent } from 'svelte'
import CityBeeCarPopover from '$lib/Popovers/CityBeeCarPopover.svelte'
import type { ICarCityBee } from '$lib/Types/Interfaces/ICarCityBee'
import { Provider } from '../Types/Enums/Provider'

class CityBeeCar implements BaseCar {
  readonly carData: ICarCityBee
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarCityBee) {
    this.carData = car
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
    this.rentTotalPrice = 10000
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
    return this.carData.icon
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
}

export default CityBeeCar
