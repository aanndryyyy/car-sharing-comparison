import type BaseCar from './BaseCar'

import CityBeeLogo from '$lib/Images/citybee.svg'
import type { SvelteComponent } from 'svelte'
import CityBeeCarPopover from '$lib/Popovers/CityBeeCarPopover.svelte'
import type { SearchParamsObj } from '../DTO/SearchParamsObj'
import type { Car } from '../DTO/Car'
import calculateCityBeePrice from '../../helpers/Calculators/CalculateCityBeePrice'

class CityBeeCar implements BaseCar {
  readonly carData
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: Car) {
    this.carData = car
  }

  /**
   * @inheritdoc
   */
  getName(): string {
    return this.carData.name
  }

  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    this.rentTotalPrice = calculateCityBeePrice(
      this.carData,
      JSON.parse(JSON.stringify(searchParamsObj))
    )
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
    return this.carData.price.minute + ' €/min'
  }

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {
    return this.carData.price.km + ' €/km'
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return CityBeeLogo
  }

  getCarImg(): string {
    // temp
    return 'https://citybee.ee/wp-content/uploads/2021/08/CityBee_ToyotaYaris_EE-1024x605.png'
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
