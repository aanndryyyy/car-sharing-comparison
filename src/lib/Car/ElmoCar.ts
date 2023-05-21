import type BaseCar from './BaseCar'

import ElmoLogo from '$lib/Images/elmo.png'
import type { SvelteComponent } from 'svelte'
import ElmoCarPopover from '$lib/Popovers/ElmoCarPopover.svelte'
import type { SearchParamsObj } from '../DTO/SearchParamsObj'
import calculateElmoPrice from '../../helpers/Calculators/CalculateElmoPrice'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'

class ElmoCar implements BaseCar {
  readonly carData: ICarElmo
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarElmo) {
    this.carData = car
  }

  /**
   * @inheritdoc
   */
  getName(): string {
    return this.carData.name
  }

  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void {
    //this.rentTotalPrice = calculateElmoPrice(this.carData, searchParamsObj)
    this.rentTotalPrice = 10
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
    return ElmoLogo
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
      component: ElmoCarPopover,
      props: {
        type: 'something',
        priceAfter100: 'something',
        classyMinimumFee: 'something',
      },
    }

    // {
    //   component: ElmoCarPopover,
    //       props: {
    //   type: this.carData.type,
    //       priceAfter100: this.carData.price.km.after100,
    //       classyMinimumFee: this.carData.price.minimum,
    // }
    // };
  }
}

export default ElmoCar
