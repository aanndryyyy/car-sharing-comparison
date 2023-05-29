/** */
export function haversineMarkers(
  mk1: google.maps.marker.AdvancedMarkerElement,
  mk2: google.maps.marker.AdvancedMarkerElement
) {
  if (!mk1.position || !mk2.position) {
    return null
  }

  const pos1 = {
    lat: mk1.position.lat,
    lng: mk1.position.lng,
  } as google.maps.LatLngLiteral
  const pos2 = {
    lat: mk2.position.lat,
    lng: mk2.position.lng,
  } as google.maps.LatLngLiteral

  return haversineRaw(pos1, pos2)
}

/**
 * @see https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
 */
export function haversineRaw(
  pos1: google.maps.LatLngLiteral,
  pos2: google.maps.LatLngLiteral
): number {
  var R = 6371.071

  var rlat1 = pos1.lat * (Math.PI / 180)
  var rlat2 = pos2.lat * (Math.PI / 180)
  var difflat = rlat2 - rlat1

  var difflon = (pos2.lng - pos1.lng) * (Math.PI / 180)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    )
  return d
}
