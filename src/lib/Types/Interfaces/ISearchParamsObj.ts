import type {City} from "../Enums/City";

export interface ISearchParamsObj {
    distance: number;
    days: number,
    hours: number,
    minutes: number,
    start: City,
    end: City
}