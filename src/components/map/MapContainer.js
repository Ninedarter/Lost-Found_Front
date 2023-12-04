import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '900px',
  height: '600px',
};

const center = {
  lat: 54.898502349853516,
  lng: 23.906171798706055
};

function MapContainer() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB2tAu2LgRqzArvz3qJ-kup_XEI4aZXvug"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
      setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </div>
  ) : <></>
}

export default React.memo(MapContainer)