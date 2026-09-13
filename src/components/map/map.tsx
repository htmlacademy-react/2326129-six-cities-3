import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks/usemap';
import { City, OfferPreview } from '../../pages/offer-page/types/types';
import { DEFAULT_MARKER_ICON, ACTIVE_MARKER_ICON } from './const';

type MapProps = {
  city: City;
  offers: OfferPreview[];
  activeOfferId?: string | null;
}

export const Map = ({city, offers, activeOfferId}: MapProps): JSX.Element => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({location: city.location, containerRef: mapContainerRef});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude,], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() : void => {
    if (map) {
      offers.forEach((offer) : void => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          }, {
            icon: offer.id === activeOfferId ? ACTIVE_MARKER_ICON : DEFAULT_MARKER_ICON,
          })
          .addTo(markerLayer.current);
      });
    }
  }, [activeOfferId, map, offers]);

  return <section style={{height: '500px'}} className="cities__map map" ref={mapContainerRef} />;
};
