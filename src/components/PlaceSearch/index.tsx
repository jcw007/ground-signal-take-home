import { useCallback, useRef, useState } from "react";
import { PlaceType } from "../../types";
import SearchInput from "./SearchInput";
import ResultList from "./ResultList";
import usePlaceData from "../../hooks/usePlaceData";

function PlaceSearch({
  onResultClick = () => {},
}: {
  onResultClick?: (place: PlaceType) => void;
}) {
  const timerIdRef = useRef<number>();
  const [results, setResults] = useState<PlaceType[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { searchPlaceByName } = usePlaceData();

  const handleResultClick = useCallback(
    (place: PlaceType) => {
      onResultClick(place);
    },
    [onResultClick]
  );

  const handleSearchInputChange = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      setIsSearching(false);

      if (trimmedQuery.length) {
        setIsSearching(true);

        // Debounce search by 300ms
        if (timerIdRef.current) {
          clearTimeout(timerIdRef.current);
        }

        timerIdRef.current = setTimeout(async () => {
          const results = await searchPlaceByName(trimmedQuery);

          if (results) {
            setResults(results);
          }
        }, 300);
      }
    },
    [searchPlaceByName]
  );

  return (
    <div className="m-2 w-96">
      {/* search input */}
      <SearchInput onInputChange={handleSearchInputChange} />

      {/* search results */}
      <ResultList
        results={results}
        isSearching={isSearching}
        onListItemClick={handleResultClick}
      />
    </div>
  );
}

export default PlaceSearch;
