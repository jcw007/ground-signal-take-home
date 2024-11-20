import { useCallback, useRef, useState } from "react";
import Map, { MapRef, ViewStateChangeEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import PlaceSearch from "../PlaceSearch";
import { PlaceType } from "../../types";
import PlacePopup from "../PlacePopup";
import PinMarker from "../PinMarker";
import PlaceList from "../PlaceList";
import usePlaceData from "../../hooks/usePlaceData";
import { printPlaceArrayToContent } from "../../utils/printPlaceArrayToContent";

function CustomMap() {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    latitude: 38.953464,
    longitude: -94.179376,
    zoom: 10,
  });
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | undefined>();
  const [placePopupOpen, setPlacePopupOpen] = useState<boolean>(false);
  const { getStarredLocations } = usePlaceData();

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

  // Hit the API to get a list of starred locations/places and
  // output the result to a new tab.
  const handleDownloadBtnClick = useCallback(async () => {
    const results = await getStarredLocations();
    const newTab = window.open("", "_blank");

    if (newTab && results?.length) {
      const content = printPlaceArrayToContent(results);
      newTab.document.write(content);
      newTab.document.close();
    } else {
      alert("Nothing to show");
    }
  }, [getStarredLocations]);

  return (
    <Map
      ref={mapRef}
      {...viewState}
      mapboxAccessToken="pk.eyJ1IjoiamN3MDA3IiwiYSI6ImNtM29ub2JjazA2MHYya3B0cTI5bnc2dzgifQ.fIiaOyq5-Y08728M3p3gCQ"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={handleMapMove}
    >
      {/* Download starred locations tab */}
      <div className="absolute w-full text-center">
        <button
          className="bg-green-500 px-4 h-10 [clip-path:polygon(0%_0%,100%_0%,90%_100%,10%_100%)]"
          onClick={handleDownloadBtnClick}
        >
          Download Starred Locations
        </button>
      </div>

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
