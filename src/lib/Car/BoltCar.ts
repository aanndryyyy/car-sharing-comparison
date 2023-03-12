import type BaseCar from "./BaseCar";
import { breakdownMinutes } from "../Time";

import BoltLogo from '$lib/Images/bolt.png';
import type { SvelteComponent } from "svelte";
import BoltCarPopover from "$lib/Popovers/BoltCarPopover.svelte";

type BoltCarObject = {
  name: string,
  type: string,
  price: {
    km: number,
    minute: number,
    hour: number,
    day: number,
    minimum: number,
  },
}

class BoltCar implements BaseCar {

  readonly carData: BoltCarObject;

  /**
   * Initialise car data.
   * 
   * @param car The car object.
   */
  constructor( car: BoltCarObject ) {
    
    this.carData = car;
  }

  /**
   * @inheritdoc
   */
  getName(): string {
    
    return this.carData.name;
  }
  
  /**
   * @inheritdoc
   */
  getTotalPrice( minutes: number, distance: number ): number {

    let duration = breakdownMinutes( minutes );

    if ( ( duration.minutes + duration.hours*60 ) * this.carData.price.minute >= this.carData.price.day ) {
      
      duration.days++;
      duration.hours   = 0;
      duration.minutes = 0;
    }
    
    if ( duration.minutes*this.carData.price.minute >= this.carData.price.hour ) {
      
      duration.hours++;
      duration.minutes = 0;
    }

    let durationPrice = duration.days*this.carData.price.day + duration.hours*this.carData.price.hour + duration.minutes*this.carData.price.minute;
    let total         = durationPrice + distance*this.carData.price.km;

    if ( total <= this.carData.price.minimum ) {
      return this.carData.price.minimum;
    }

    return total;
  }

  /**
   * @inheritdoc
   */
  getFormattedTotalPrice( minutes: number, distance: number ): string {

    return ( this.getTotalPrice( minutes, distance ) ).toFixed(2) + " €";
  }

  /**
   * @inheritdoc
   */
  getFormattedLongTermDiscount( minutes: number, distance: number ): string {

    return ( this.getTotalPrice( minutes, distance ) - this.carData.price.minute*minutes ).toFixed(2) + " €";
  }

  /**
   * @inheritdoc
   */
  getFormattedMinutePrice(): string {

    return this.carData.price.minute + ' €/min';
  } 

  /**
   * @inheritdoc
   */
  getFormattedKilometrePrice(): string {

    return this.carData.price.km + ' €/min';
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {

    return BoltLogo;
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent, props: object } {

    return {
      component: BoltCarPopover,
      props: {
        minimumFee: this.carData.price.minimum,
      }
    };
  }
}

export type { BoltCarObject };
export default BoltCar;