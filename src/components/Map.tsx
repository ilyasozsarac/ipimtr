import React, { useCallback, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { elementType } from 'prop-types';

export interface MapProps {
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: '100%',
  height: '350px' // set a fixed height
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: 'cooperative',
  styles: [
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    }
  ]
};

const libraries = ['places']; // Define libraries outside the component
type LibraryType = "places";

export const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const [loadError, setLoadError] = useState<boolean>(false);

  const { isLoaded, loadError: apiLoadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    preventGoogleFontsLoading: true,
    nonce: process.env.REACT_APP_CSP_NONCE,
    libraries: libraries as LibraryType[],
    //channel: 'ipim-tr-map'  // Changed from channelId to channel
  });

  const center = useMemo(() => ({
    lat: latitude,
    lng: longitude
  }), [latitude, longitude]);

  const onLoad = useCallback((map: google.maps.Map) => {
    try {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center); // Extend the bounds to include the center
      map.fitBounds(bounds); // Fit the bounds to the center
      map.setZoom(13);
    } catch (error) {
      console.error('Map load error:', error);
      setLoadError(true);
    }
  }, [center]);

  if (loadError || apiLoadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <p className="text-gray-600 mb-2">Unable to load map</p>
          <p className="text-sm text-gray-500">Please disable ad blocker or try again later</p>
        </div>
      </div>
    );
  }

  return isLoaded ? (
    <div className="w-full h-full relative overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
        mapTypeId='roadmap'
      >
        <Marker
    icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    key="1"
    position={center}
   />
      </GoogleMap>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, white 0%, rgba(255,255,255,0.9) 15%, rgba(255,255,255,0) 50%)',
          zIndex: 2,
          width: '50%'
        }}
      />
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500" />
    </div>
  );
};

export default Map;
