import type BaseCar from "./BaseCar";
import { breakdownMinutes } from "../Time";

import ElmoLogo from '$lib/Images/elmo.png';
import type { SvelteComponent } from "svelte";
import ElmoCarPopover from "$lib/Popovers/ElmoCarPopover.svelte";

type ElmoCarObject = {
  name: string,
  type: "eco" | "comfy" | "classy",
  price: {
    km: {
      base: number,
      after100: number,
    },
    minute: number,
    hour: number,
    day: number,
    week: {
      price: number,
      km: {
        included: number,
        priceAfter: number,
      }
    },
    month: {
      price: number,
      km: {
        included: number,
        priceAfter: number,
      }
    },
    minimum: number,
    start: number,
  },
  priceWithCustomerCard: {
    km: number,
    hour: number,
    minimum: number,
  }
}

class ElmoCar implements BaseCar {

  readonly carData: ElmoCarObject;

  /**
   * Initialise car data.
   * 
   * @param car The car object.
   */
  constructor( car: ElmoCarObject ) {
    
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

    let kilometrePrice = this.carData.price.km.base;

    if ( distance > 100 ) {
      kilometrePrice = this.carData.price.km.after100;
    }
    
    // TODO: Free 700km in week
    // TODO: Free 3000km in month

    let durationPrice = duration.days*this.carData.price.day + duration.hours*this.carData.price.hour + duration.minutes*this.carData.price.minute;
    let total         = durationPrice + distance*kilometrePrice;

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

    return this.carData.price.km.base + ' €/min';
  }

  /**
   * @inheritdoc
   */
  getLogo(): string {

    return ElmoLogo;
  }

  /**
   * @inheritdoc
   */
  getDetailedDialog(): { component: typeof SvelteComponent, props: object } {

    return {
      component: ElmoCarPopover,
      props: {
        type: this.carData.type,
        priceAfter100: this.carData.price.km.after100,
        classyMinimumFee: this.carData.price.minimum,
      }
    };
  }
}

export type { ElmoCarObject };
export default ElmoCar;