import type { SvelteComponent } from 'svelte'
import type { Car } from '../DTO/Car'
import type { SearchParamsObj } from '$lib/DTO/SearchParamsObj'

/**
 * Defines a standard format for each company car so
 * prices can be easily compared.
 */
export default interface BaseCar {
  readonly carData: Car
  rentTotalPrice: number | undefined

  /**
   * Get the name.
   *
   * @return The name.
   */
  getName(): string

  /**
   * Calculating total price
   *
   *
   * @returns The price.
   * @param searchParamsObj
   */
  calculateRentTotalPrice(searchParamsObj: SearchParamsObj): void

  /**
   * The total price in number format, for sorting
   *
   *
   * @returns The price.
   */
  getTotalPrice(): number

  /**
   * The total price as formatted text.
   *
   *
   * @returns Formatted price.
   */
  getFormattedTotalPrice(): string

  /**
   * The long term discount formatted as text.
   *
   *
   * @returns Formatted price.
   */
  getFormattedLongTermDiscount(): string

  /**
   * The minute price as formatted text.
   *
   * @returns Formatted price.
   */
  getFormattedMinutePrice(): string

  /**
   * The kilometre price as formatted text.
   *
   * @returns Formatted price.
   */
  getFormattedKilometrePrice(): string

  /**
   * Get the logo.
   */
  getLogo(): string

  /**
   * Get the logo.
   */
  getCarImg(): string

  /**
   * The more info dialog component.
   */
  getDetailedDialog(): { component: typeof SvelteComponent; props: object }
}
