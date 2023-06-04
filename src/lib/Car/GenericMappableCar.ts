import { haversineRaw } from '$lib/helpers/haversine'
import type { CarData } from './GenericCar'
import GenericCar from './GenericCar'

export default abstract class GenericMappableCar<
  CarDataType extends CarData = CarData
> extends GenericCar<CarDataType> {
  markers: google.maps.marker.AdvancedMarkerElement[] = []
  closestMarker?: google.maps.marker.AdvancedMarkerElement
  closestMarkerDistance?: number

  public findClosestMarkerTo(
    lat: number,
    lng: number
  ): google.maps.marker.AdvancedMarkerElement | null {
    if (this.markers.length === 0) return null

    this.markers.sort((marker1, marker2) => {
      return (
        haversineRaw(marker2.position, { lat, lng }) -
        haversineRaw(marker1.position, { lat, lng })
      )
    })

    this.closestMarker = this.markers[0]
    this.closestMarkerDistance = haversineRaw(this.markers[0].position, {
      lat,
      lng,
    })

    return this.closestMarker
  }

  public getClosestMarkerDistanceFormatted() {
    if (!this.closestMarkerDistance) return ''
    if (this.closestMarkerDistance <= 1) {
      return (this.closestMarkerDistance * 1000).toFixed(0) + ' m'
    }
    return this.closestMarkerDistance.toFixed(2) + ' km'
  }

  /**
   * Initialise the markers.
   */
  abstract initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void

  /**
   * The Element for dot icon.
   */
  abstract getMarkerDotIcon(): Element

  /**
   * The Element for icon with price.
   */
  abstract getMarkerPriceIcon(): Element
}
