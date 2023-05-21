import type BaseCar from './BaseCar'

import BoltLogo from '$lib/Images/bolt.png'
import type { SvelteComponent } from 'svelte'
import BoltCarPopover from '$lib/Popovers/BoltCarPopover.svelte'
import type { SearchParamsObj } from '../DTO/SearchParamsObj'
import calculateBoltPrice from '../../helpers/Calculators/CalculateBoltPrice'
import type { ICarBolt } from '$lib/Types/Interfaces/ICarBolt'

class BoltCar implements BaseCar {
  readonly carData: ICarBolt
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarBolt) {
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
    return this.carData.icon
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
}

export default BoltCar
