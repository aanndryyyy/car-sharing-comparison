import calculateBeastPrice from '../../helpers/Calculators/CalculateBeastPrice'
import GenericCar from './GenericCar'

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

export default class BeastCar extends GenericCar<ICarBeast> {
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
  getLogo(): string {
    return BeastLogo
  }

  getCarImg(): string {
    switch (this.carData.name) {
      case 'Model 3 Standard Range':
        return Tesla_Model_3_Standard_Range
      case 'Model 3 Long Range':
        return Tesla_Model_3_Long_Range
      case 'Model 3 Performance':
        return Tesla_Model_3_Performance
      case 'Model Y Long Range':
        return Tesla_Model_Y_Long_Range
      case 'Model S Standard Range':
        return Tesla_Model_S
      case 'Model Y Performance':
        return Tesla_Model_Y_Long_Range
      case 'Model S Performance':
        return Tesla_Model_S
      case 'Model X Performance':
        return Tesla_Model_X_Performance
      default:
        return No_image_available
    }
  }

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {}
}
