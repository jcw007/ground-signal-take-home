import { useCallback, useState } from "react";
import { PlaceType } from "../../types";
import SearchInput from "./SearchInput";
import ResultList from "./ResultList";

function PlaceSearch({
  onResultClick = () => {},
}: {
  onResultClick?: (place: PlaceType) => void;
}) {
  const [results, setResults] = useState<PlaceType[]>([]);

  const handleResultClick = useCallback(
    (place: PlaceType) => {
      onResultClick(place);
    },
    [onResultClick]
  );

  const handleFinishSearch = useCallback((places: PlaceType[]) => {
    setResults(places);
  }, []);

  return (
    <div className="m-2 w-96">
      {/* search input */}
      <SearchInput onFinishSearch={handleFinishSearch} />

      {/* search results */}
      <ResultList results={results} onListItemClick={handleResultClick} />
    </div>
  );
}

export default PlaceSearch;
