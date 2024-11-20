import { useCallback, useRef, useState } from "react";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import PlaceSearch from "../PlaceSearch";
import PinIcon from "../PinIcon";
import { PlaceType } from "../../types";
import PlacePopup from "../PlacePopup";

function CustomMap() {
  const mapRef = useRef(null);
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
      setViewState({ latitude, longitude, zoom: 15 });
    }
  }, []);

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
        <Marker
          latitude={selectedPlace.location.lat}
          longitude={selectedPlace.location.lon}
          onClick={handlePlaceMarkerClick}
        >
          <PinIcon />
        </Marker>
      )}
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
