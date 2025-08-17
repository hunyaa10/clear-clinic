"use client"

import { useCallback, useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

interface GoogleMapComponentProps {
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  width?: string
  className?: string
}

export default function GoogleMapComponent({
  center = { lat: 37.5666805, lng: 126.9784147 }, // 서울 시청 기본값
  zoom = 15,
  height = '400px',
  width = '100%',
  className = '',
}: GoogleMapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  })

  const containerStyle = useMemo(() => ({
    width,
    height,
  }), [width, height])

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return (
      <div 
        style={containerStyle} 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        지도를 불러오는 중...
      </div>
    )
  }

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
}
