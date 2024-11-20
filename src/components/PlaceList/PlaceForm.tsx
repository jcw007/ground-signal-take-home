import { ChangeEvent, useCallback, useState } from "react";
import { PlaceType } from "../../types";

// A form component for displaying some of he property fields on a place object
function PlaceForm({
  place = {} as PlaceType,
  onSaveBtnClick = () => undefined,
}: {
  place?: PlaceType;
  onSaveBtnClick?: (
    place: PlaceType
  ) => Promise<"added" | "updated" | undefined>;
}) {
  // For storing a local copy of the place data
  const [placeLocalState, setPlaceLocalState] = useState<PlaceType>({
    id: place.id || (Math.random() + 1).toString(36).substring(2),
    name: place.name || "",
    location: {
      lat: place.location?.lat || "",
      lon: place.location?.lon || "",
    },
    details: {
      description: place.details?.description || "",
      website: place.details?.website || "",
    },
    starred: place.starred || false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlaceLocalState((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handleLatChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlaceLocalState((prev) => ({
      ...prev,
      location: { ...prev.location, lat: +e.target.value },
    }));
  }, []);

  const handleLonChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPlaceLocalState((prev) => ({
      ...prev,
      location: { ...prev.location, lon: +e.target.value },
    }));
  }, []);

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setPlaceLocalState((prev) => ({
        ...prev,
        details: { ...prev.details, description: e.target.value },
      }));
    },
    []
  );

  const handleWebsiteChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const copy = { ...placeLocalState } as PlaceType;

      copy["details"] = {
        ...placeLocalState.details,
        website: e.target.value,
      } as PlaceType["details"];

      setPlaceLocalState(copy);
    },
    [placeLocalState]
  );

  const handleClearBtnClick = useCallback(() => {
    setPlaceLocalState(place);
  }, [place]);

  const handleSaveBtnClick = useCallback(async () => {
    setLoading(true);
    const result = await onSaveBtnClick(placeLocalState);

    // Clear out form if add was successful
    if (result === "added") {
      setPlaceLocalState({
        id: place.id || (Math.random() + 1).toString(36).substring(2),
        location: {
          lat: "",
          lon: "",
        },
        name: "",
        details: {
          description: "",
          website: "",
        },
        starred: false,
      } as PlaceType);
    }
    setLoading(false);
  }, [onSaveBtnClick, place.id, placeLocalState]);

  const handleStarredChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const starred = e.target.checked;

      setPlaceLocalState((prev) => ({
        ...prev,
        starred,
      }));
    },
    []
  );

  return (
    <div className="pb-2">
      <table className="border-separate">
        <tbody>
          {/* Name field */}
          <tr>
            <td className="font-bold">Name*</td>
            <td>
              <input
                type="text"
                className="border border-gray-400"
                value={placeLocalState.name}
                disabled={loading}
                placeholder="required"
                onChange={handleNameChange}
              />
            </td>
          </tr>
          {/* Lat field */}
          <tr>
            <td className="font-bold">Lat*</td>
            <td>
              <input
                type="number"
                className="border border-gray-400"
                value={placeLocalState.location.lat}
                disabled={loading}
                placeholder="required"
                onChange={handleLatChange}
              />
            </td>
          </tr>
          {/* Lon field */}
          <tr>
            <td className="font-bold">Lon*</td>
            <td>
              <input
                type="number"
                className="border border-gray-400"
                value={placeLocalState.location.lon}
                disabled={loading}
                placeholder="required"
                onChange={handleLonChange}
              />
            </td>
          </tr>
          {/* description field */}
          <tr>
            <td className="font-bold">description</td>
            <td>
              <textarea
                className="border border-gray-400"
                value={placeLocalState.details!.description}
                disabled={loading}
                onChange={handleDescriptionChange}
              />
            </td>
          </tr>
          {/* website field */}
          <tr>
            <td className="font-bold">website</td>
            <td>
              <input
                type="text"
                className="border border-gray-400"
                value={placeLocalState.details!.website}
                disabled={loading}
                onChange={handleWebsiteChange}
              />
            </td>
          </tr>
          {/* starred */}
          <tr>
            <td className="font-bold">starred</td>
            <td>
              <input
                type="checkbox"
                className="border border-gray-400"
                checked={placeLocalState.starred}
                disabled={loading}
                onChange={handleStarredChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-2">
        <div className="flex-1"></div>
        {/* Form clear btn */}
        <button
          type="button"
          className="border border-gray-400 rounded px-2"
          disabled={loading}
          onClick={handleClearBtnClick}
        >
          Clear
        </button>
        {/* Form save btn */}
        <button
          type="button"
          className="border border-gray-400 rounded px-2 bg-blue-500 text-white"
          disabled={loading}
          onClick={handleSaveBtnClick}
        >
          Save
        </button>
        {/* Message area */}
        <div className="flex-1">{loading ? "Saving..." : ""}</div>
      </div>
    </div>
  );
}

export default PlaceForm;
