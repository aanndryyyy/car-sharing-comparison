import type { CarData } from './GenericCar'
import GenericCar from './GenericCar'

export default abstract class GenericMappableCar<
  CarDataType extends CarData = CarData
> extends GenericCar<CarDataType> {
  public getClosestMarkerDistanceFormatted() {
    if (!this.closestMarkerDistance) return ''
    if (this.closestMarkerDistance <= 1) {
      return (this.closestMarkerDistance * 1000).toFixed(0) + ' m'
    }
    return this.closestMarkerDistance.toFixed(2) + ' km'
  }

  public setMarkerIcon(
    marker: google.maps.marker.AdvancedMarkerElement,
    index: number,
    type?: string
  ) {
    const previousMarkerContentIsHidden: boolean =
      marker.content.className.includes('!hidden')
    switch (type) {
      case 'price':
        marker.content = this.getMarkerPriceIcon()
        break

      default:
        marker.content = this.getMarkerDotIcon()
        break
    }
    if (previousMarkerContentIsHidden)
      marker.content.className = marker.content.className + ' !hidden'
    const carsGroupingClassName =
      this.getName().replace(' ', '-') +
      '-' +
      this.provider.toLowerCase() +
      '-' +
      'marker'
    marker.content.className =
      marker.content.className + ' ' + carsGroupingClassName
    marker.content.id = index + 1 + '-' + carsGroupingClassName
  }

  /**
   * Initialise the markers.
   */
  public initialiseMarkers(
    AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
    map?: google.maps.Map
  ): void {
    this.markers = []
    this.carData.coordinates.forEach(({ lat, lng }) => {
      const marker = new AdvancedMarkerElement({
        map,
        content: this.getMarkerDotIcon(),
        position: { lat, lng },
      })

      marker.addListener('click', () => {
        if (!marker.content.className.includes('detail-icon')) {
          marker.content = this.getMarkerDetailIcon()
          marker.zIndex = 20
        } else {
          if (map.getZoom() < 14) {
            marker.content = this.getMarkerDotIcon()
          } else {
            marker.content = this.getMarkerPriceIcon()
          }
          marker.zIndex = 10
        }
      })

      this.markers.push(marker)
    })
  }

  getMarkerDotIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = `dot-icon bg-brand-${this.provider.toLowerCase()}`

    return content
  }

  getMarkerPriceIcon(): HTMLDivElement {
    const content = document.createElement('div')
    content.className = `dot-icon bg-brand-${this.provider.toLowerCase()}`

    const priceIcon = document.createElement('div')
    priceIcon.className = 'price-icon'

    priceIcon.innerText = this.getFormattedTotalPrice()
    priceIcon.appendChild(content)

    return priceIcon
  }

  getMarkerDetailIcon(): HTMLDivElement {
    const content = `<div style="display: flex; padding: 0.25rem; font-size: 0.75rem; line-height: 1rem; align-items: center; background: white; border-color: #E2E8F0; border-width: 1px; border-radius: 6px; z-index: 200">
                <div>
                    <img src=${this.getCarImg()} alt="car image" width="80">
                </div> 
                <div>
                    <p>${this.getName()}</p>
                    <p>${this.getFormattedMinutePrice()}</p>
                    <p>${this.getFormattedKilometrePrice()}</p>
                    <p><b>${this.getFormattedTotalPrice()}</b></p>
                </div>
            </div>`
    const priceIcon = document.createElement('div')
    priceIcon.className = 'detail-icon'

    priceIcon.innerHTML = content

    return priceIcon
  }
}
