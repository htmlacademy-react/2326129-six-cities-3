import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks/usemap';
import { City, OfferPreview } from '../../pages/offer-page/types/types';
import { DEFAULT_MARKER_ICON, ACTIVE_MARKER_ICON } from './const';

type MapProps = {
  className?: string;
  city: City;
  offers: OfferPreview[];
  activeOfferId?: string | null;
}

export const Map = ({ className, city, offers, activeOfferId}: MapProps): JSX.Element => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({location: city.location, containerRef: mapContainerRef});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      markerLayer.current.addTo(map);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city.location.latitude, city.location.longitude, city.location.zoom]);

  useEffect(() => {
    if (!map) {
      return;
    }
    markerLayer.current.clearLayers();
    offers.forEach((offer) => {
      leaflet
        .marker(
          { lat: offer.location.latitude, lng: offer.location.longitude },
          { icon: offer.id === activeOfferId ? ACTIVE_MARKER_ICON : DEFAULT_MARKER_ICON }
        )
        .addTo(markerLayer.current);
    });
  }, [map, offers, activeOfferId]);

  return <section className={`map ${className}`} ref={mapContainerRef} />;
};
