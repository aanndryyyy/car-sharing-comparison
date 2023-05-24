import calculateBeastPrice from '../../helpers/Calculators/CalculateBeastPrice'
import type BaseCar from './BaseCar'

import BeastLogo from '$lib/Images/beast.png'
import type { SvelteComponent } from 'svelte'
import BeastCarPopover from '$lib/Popovers/BeastCarPopover.svelte'
import type { ICarBeast } from '$lib/Types/Interfaces/ICarBeast'
import { Provider } from '../Types/Enums/Provider'
import No_image_available from '$lib/Images/no-image-available.png'
import Tesla_Model_3_Long_Range from '$lib/Images/Providers/Beast/Cars/Tesla-Model-3-Long-Range.png'
import Tesla_Model_3_Standard_Range from '$lib/Images/Providers/Beast/Cars/Tesla-Model-3-Standard-Range.png'
import Tesla_Model_3_Performance from '$lib/Images/Providers/Beast/Cars/Tesla-Model-3-Performance.png'
import Tesla_Model_X_Performance from '../Images/Providers/Beast/Cars/Tesla-Model-X-Performance.png'
import Tesla_Model_Y_Long_Range from '$lib/Images/Providers/Beast/Cars/Tesla-Model-Y-Long-Range.png'
import Tesla_Model_S from '$lib/Images/Providers/Beast/Cars/Tesla-Model-S.png'

class BeastCar implements BaseCar {
  readonly carData: ICarBeast
  rentTotalPrice: number | undefined

  /**
   * Initialise car data.
   *
   * @param car The car object.
   */
  constructor(car: ICarBeast) {
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
    return Provider.BEAST
  }

  /**
   * @inheritdoc
   */
  calculateRentTotalPrice(): void {
    this.rentTotalPrice = calculateBeastPrice(this.carData)
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
    return BeastLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case "Model 3 Standard Range":
        return Tesla_Model_3_Standard_Range
      case "Model 3 Long Range":
        return Tesla_Model_3_Long_Range
      case "Model 3 Performance":
        return Tesla_Model_3_Performance
      case "Model Y Long Range":
        return Tesla_Model_Y_Long_Range
      case "Model S Standard Range":
        return Tesla_Model_S
      case "Model Y Performance":
        return Tesla_Model_Y_Long_Range
      case "Model S Performance":
        return Tesla_Model_S
      case "Model X Performance":
        return Tesla_Model_X_Performance
      default:
        return No_image_available
    }
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent; props: object } {
    return {
      component: BeastCarPopover,
      props: {
        depositBase: 0,
        depositSpecial: 0,
      },
    }
    // return {
    //   component: BeastCarPopover,
    //   props: {
    //     depositBase: this.carData.price.deposit.base,
    //     depositSpecial: this.carData.price.deposit.special,
    //   }
    // };
  }
}

export default BeastCar
