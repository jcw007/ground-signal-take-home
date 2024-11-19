import PinIcon from "../PinIcon";
import { PlaceType } from "../../types";
import { useCallback } from "react";

function ResultList({
  results,
  onResultClick = () => {},
}: {
  results: PlaceType[];
  onResultClick?: (place: PlaceType) => void;
}) {
  const handleResultClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const id = e.currentTarget.dataset.id;

      if (id != null) {
        const found = results.find((result) => result.id === id);

        if (found) {
          onResultClick(found);
          // setQuery("");
          // setResults([]);
        }
      }
    },
    [onResultClick, results]
  );

  return results.length ? (
    <div className="mt-4 shadow-md">
      <div className="bg-blue-500 text-white font-bold p-3">
        Found {results.length} Result(s):
      </div>
      {results.map(({ id, name, location: { lat, lon } }) => (
        <div
          key={id}
          className="flex bg-white p-2 gap-2 cursor-pointer hover:bg-gray-200"
          data-id={id}
          onClick={handleResultClick}
        >
          <PinIcon />
          <div className="gap-1 flex-1 flex flex-col">
            <div className="font-bold text-sm">{name}</div>
            <div>
              {lat}, {lon}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default ResultList;
