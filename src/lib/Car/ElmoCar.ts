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
import GenericCar from './GenericCar'

export default class ElmoCar extends GenericCar<ICarElmo> {
  calculateRentTotalPrice(): void {
    //this.rentTotalPrice = calculateElmoPrice(this.carData, searchParamsObj)
    this.rentTotalPrice = 10000
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

  initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {}
}
