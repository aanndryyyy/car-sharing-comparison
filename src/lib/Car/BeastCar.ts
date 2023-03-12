import type BaseCar from "./BaseCar";
import { breakdownMinutes } from "../Time";

import BeastLogo from '$lib/Images/beast.png';
import type { SvelteComponent } from "svelte";
import BeastCarPopover from "$lib/Popovers/BeastCarPopover.svelte";

type BeastCarObject = {
  name: string,
  price: {
    km: number,
    minute: number,
    day: number,
    threeDays: number,
    week: number,
    start: number,
    deposit: {
      base: number,
      special: number,
    },
  },
}

class BeastCar implements BaseCar {

  readonly carData: BeastCarObject;

  /**
   * Initialise car data.
   * 
   * @param car The car object.
   */
  constructor( car: BeastCarObject ) {
    
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

    let duration       = breakdownMinutes( minutes );
    let kilometrePrice = 0;
    let durationPrice  = 0;

    if ( distance > ( 300 + duration.days*300 ) ) {
      kilometrePrice = this.carData.price.km;
    }

    let theeDayCount = Math.floor( duration.days/3 );
    let weekCount    = Math.floor( duration.days/7 );

    durationPrice = Math.min( 
      duration.minutes * this.carData.price.minute + (duration.hours*60) * this.carData.price.minute + duration.days * this.carData.price.day, 
      this.carData.price.day + duration.days*this.carData.price.day,
      this.carData.price.threeDays + theeDayCount*this.carData.price.threeDays,
      this.carData.price.week + weekCount*this.carData.price.week,
    );

    let total = durationPrice + distance*kilometrePrice;

    return total + this.carData.price.start;
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

    return this.carData.price.km + ' €/km after 300km';
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {

    return BeastLogo;
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent, props: object } {

    return {
      component: BeastCarPopover,
      props: {
        depositBase: this.carData.price.deposit.base,
        depositSpecial: this.carData.price.deposit.special,
      }
    };
  }
}

export type { BeastCarObject };
export default BeastCar;