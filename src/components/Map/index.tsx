import { useCallback, useRef, useState } from "react";
import Map, { MapRef, ViewStateChangeEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import PlaceSearch from "../PlaceSearch";
import { PlaceType } from "../../types";
import PlacePopup from "../PlacePopup";
import PinMarker from "../PinMarker";
import PlaceList from "../PlaceList";

function CustomMap() {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    latitude: 38.953464,
    longitude: -94.179376,
    zoom: 10,
  });
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | undefined>();
  const [placePopupOpen, setPlacePopupOpen] = useState<boolean>(false);

  const handleMapMove = useCallback((e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  }, []);

  const handlePlaceSearchResultClick = useCallback((place: PlaceType) => {
    const {
      location: { lat: latitude, lon: longitude },
    } = place;

    if (latitude && longitude) {
      setSelectedPlace(place);

      if (mapRef.current) {
        const map = mapRef.current.getMap();

        // Use fly to animation
        map.flyTo({
          center: [+longitude, +latitude],
          zoom: 15,
          speed: 5,
          curve: 1,
        });
      } else {
        // Default to using view state change
        setViewState({ latitude: +latitude, longitude: +longitude, zoom: 15 });
      }
    }
  }, []);

  // TODO: fix typing here
  const handlePlaceMarkerClick = useCallback((e) => {
    e.originalEvent?.stopPropagation();
    setPlacePopupOpen(true);
  }, []);

  const handlePlacePopupCloseBtnClick = useCallback(() => {
    setPlacePopupOpen(false);
  }, []);

  return (
    <Map
      ref={mapRef}
      {...viewState}
      mapboxAccessToken="pk.eyJ1IjoiamN3MDA3IiwiYSI6ImNtM29ub2JjazA2MHYya3B0cTI5bnc2dzgifQ.fIiaOyq5-Y08728M3p3gCQ"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={handleMapMove}
    >
      {/* Place Search control */}
      <div className="absolute top-0 left-0">
        <PlaceSearch onResultClick={handlePlaceSearchResultClick} />
      </div>
      {/* Place markers */}
      {!!selectedPlace && (
        <PinMarker
          lat={+selectedPlace.location.lat}
          lon={+selectedPlace.location.lon}
          onClick={handlePlaceMarkerClick}
        />
      )}

      {/* Place List */}
      <PlaceList />

      {/* Place popup */}
      {!!selectedPlace && placePopupOpen && (
        <PlacePopup
          place={selectedPlace}
          onCloseBtnClick={handlePlacePopupCloseBtnClick}
        />
      )}
    </Map>
  );
}

export default CustomMap;
