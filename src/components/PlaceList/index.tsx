import { type MouseEvent, useCallback, useState } from "react";
import { PlaceType } from "../../types";
import PlaceForm from "./PlaceForm";
import { BiX } from "react-icons/bi";
import usePlaceData from "../../hooks/usePlaceData";
import { useMap } from "react-map-gl";

// A component for displaying a list of places from db
function PlaceList() {
  const [expanded, setExpanded] = useState(true);
  const { places, createPlace, updatePlace, deletePlace } = usePlaceData();
  const { current: map } = useMap();

  // Update place record
  const handleExistingPlaceListSaveBtnClick = useCallback(
    async (place: PlaceType) => {
      await updatePlace(place);

      return "updated";
    },
    [updatePlace]
  );

  // Add new place record
  const handleNewPlaceSaveBtnClick = useCallback(
    async (place: PlaceType) => {
      const { name, location: { lat, lon } = {} } = place;

      if (name && lat && lon) {
        await createPlace(place);

        return "added";
      }
    },
    [createPlace]
  );

  // Delete place record
  const handlePlaceListItemDeleteBtnClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      const id = e.currentTarget.dataset.id;

      if (id != null) {
        deletePlace(id);
      }
    },
    [deletePlace]
  );

  const handleSeeOnMapClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { lat, lon } = e.currentTarget.dataset;

      if (lat && lon && map) {
        map.flyTo({ center: [+lon, +lat], zoom: 15 });
      }
    },
    [map]
  );

  return (
    <div
      className={`absolute right-0 h-full flex transition-all duration-500 ${
        expanded ? "w-72" : "w-8"
      } `}
    >
      {/* Expand/collapse button/tab */}
      <div>
        <button
          className="w-8 h-28 [clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_90%)] bg-pink-500"
          onClick={() => setExpanded(!expanded)}
        ></button>
      </div>
      <div className="flex-1 flex flex-col bg-white">
        <div className="text-xl text-center p-2">Places</div>
        {/* add new */}
        <div className="bg-amber-400">
          <div className="text-base text-center p-2">Add A New Place</div>
          <PlaceForm onSaveBtnClick={handleNewPlaceSaveBtnClick} />
        </div>
        {/* existing places */}
        <div className="text-base text-center p-2 bg-lime-500">
          Existing Places
        </div>
        <div className="flex-1 overflow-y-auto">
          {places.map((place) => (
            // Card item for each place
            <div key={place.id} className="border border-black rounded m-1">
              <div className="flex">
                <div className="flex-1">ID: {place.id}</div>
                <div className="flex-1">
                  <button
                    className="underline"
                    data-lat={place.location.lat}
                    data-lon={place.location.lon}
                    onClick={handleSeeOnMapClick}
                  >
                    See on map
                  </button>
                </div>
                <button
                  data-id={place.id}
                  onClick={handlePlaceListItemDeleteBtnClick}
                >
                  <BiX className="w-4 h-4" />
                </button>
              </div>
              <PlaceForm
                place={place}
                onSaveBtnClick={handleExistingPlaceListSaveBtnClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaceList;
