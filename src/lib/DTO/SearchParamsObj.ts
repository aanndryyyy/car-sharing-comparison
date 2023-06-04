import type { ISearchParamsObj } from '../Types/Interfaces/ISearchParamsObj'
import { City } from '../Types/Enums/City'

export class SearchParamsObj implements ISearchParamsObj {
  distance = 0
  days = 0
  hours = 0
  minutes = 0
  start = City.TALLINN
  end = City.TALLINN

  get duration() {
    return this.minutes + this.hours * 60 + this.days * 24 * 60
  }
}
