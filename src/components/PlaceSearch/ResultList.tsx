import { useCallback, useMemo, MouseEvent } from "react";
import { PlaceType } from "../../types";
import PinIcon from "../PinIcon";

function ResultList({
  isSearching = false,
  results,
  onListItemClick = () => {},
}: {
  isSearching?: boolean;
  results: PlaceType[];
  onListItemClick?: (place: PlaceType) => void;
}) {
  // List header string
  const foundResultString = useMemo(() => {
    return `Found ${results.length} Result${results.length > 1 ? "s" : ""}`;
  }, [results]);

  const handleListItemClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const id = e.currentTarget.dataset.id;

      if (id != null) {
        // Find place object by id.
        // Converting result.id to number because json-server sometimes
        // converts id to string.
        const found = results.find((result) => +result.id === +id);

        if (found) {
          onListItemClick(found);
        }
      }
    },
    [onListItemClick, results]
  );

  return isSearching ? (
    <div className="mt-4 shadow-md">
      {/* List header */}
      {/* Round all four corners if displying no result message */}
      <div
        className={`bg-blue-500 text-white font-bold p-3 ${
          results.length ? "rounded-t" : "rounded"
        }`}
      >
        {foundResultString}
      </div>
      {/* List items */}
      {results.map(({ id, name, location: { lat, lon } }) => (
        <div
          key={id}
          className="flex items-center bg-white p-2 gap-2 cursor-pointer hover:bg-gray-200 last:rounded"
          data-id={id}
          onClick={handleListItemClick}
        >
          <PinIcon />
          <div className="flex-1 flex flex-col">
            <div className="font-bold text-sm">{name}</div>
            <div className="text-gray-400">
              {lat}, {lon}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default ResultList;
