import type BaseCar from './BaseCar'

import ElmoLogo from '$lib/Images/elmo.png'
import type { SvelteComponent } from 'svelte'
import ElmoCarPopover from '$lib/Popovers/ElmoCarPopover.svelte'
import type { ICarElmo } from '$lib/Types/Interfaces/ICarElmo'
import { Provider } from '../Types/Enums/Provider'
import No_image_available from '$lib/Images/no-image-available.png'
import Nissan_Leaf from '$lib/Images/Providers/Elmo/Cars/Nissan-Leaf.png'
import Peugeot_e_208_GT from '$lib/Images/Providers/Elmo/Cars/Peugeot-e-208-GT.png'
import Renault_Arkana_Hybrid from '$lib/Images/Providers/Elmo/Cars/Renault-Arkana-Hybrid.png'
import Renault_Clio_Hybrid from '$lib/Images/Providers/Elmo/Cars/Renault-Clio-Hybrid.png'
import Renault_Zoe from '$lib/Images/Providers/Elmo/Cars/Renault-Zoe.png'
import Skoda_Citigo from '$lib/Images/Providers/Elmo/Cars/Skoda-Citigo.png'
import Tesla_Model_3_SR from '$lib/Images/Providers/Elmo/Cars/Tesla-Model-3-SR+.png'
import Tesla_Model_Y from '$lib/Images/Providers/Elmo/Cars/Tesla-Model-Y.png'
import Toyota_Yaris_Hybrid from '$lib/Images/Providers/Elmo/Cars/Toyota-Yaris-Hybrid.png'
import VW_e_Up20 from '$lib/Images/Providers/Elmo/Cars/VW-e-Up20.png'

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

  /**
   * @inheritdoc
   */
  getProvider(): string {
    return Provider.ELMO
  }

  calculateRentTotalPrice(): void {
    //this.rentTotalPrice = calculateElmoPrice(this.carData, searchParamsObj)
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
    return this.carData.price.km.base + ' km'
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {
    return ElmoLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case "Volkswagen e-Up!'19":
        return VW_e_Up20
      case 'Skoda Citigo':
        return Skoda_Citigo
      case 'Toyota Yaris Hybrid':
        return Toyota_Yaris_Hybrid
      case 'Renault Clio Hybrid 2021':
        return Renault_Clio_Hybrid
      case 'Nissan Leaf':
        return Nissan_Leaf
      case 'Peugeot e208 GT':
        return Peugeot_e_208_GT
      case 'Renault Arkana Hybrid':
        return Renault_Arkana_Hybrid
      case 'Renault Zoe':
        return Renault_Zoe
      case 'Tesla Model 3':
        return Tesla_Model_3_SR
      case 'Tesla Model Y':
        return Tesla_Model_Y
      default:
        return No_image_available
    }
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
