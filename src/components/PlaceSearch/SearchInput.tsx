import { ChangeEvent, useCallback, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { PlaceType } from "../../types";

function SearchInput({
  onFinishSearch = () => {},
}: {
  onFinishSearch?: (places: PlaceType[]) => void;
}) {
  const [query, setQuery] = useState<string>("Alberts Bike Shop");
  const timerIdRef = useRef<number>();

  const doPlaceSearch = useCallback(async (query: string) => {
    const response = await fetch(`http://localhost:3000/places?name=${query}`);

    return await response.json();
  }, []);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;

      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }

      // do search after stop typing for 1s
      timerIdRef.current = setTimeout(async () => {
        let results = [];

        if (newQuery.length) {
          results = await doPlaceSearch(newQuery);
        }

        onFinishSearch(results);
      }, 100);

      setQuery(newQuery);
    },
    [onFinishSearch, doPlaceSearch]
  );

  return (
    <div className="flex gap-4 p-4 items-center shadow-md bg-white rounded">
      <BiSearch className="h-5 w-5" />
      <input
        className="text-base flex-1 outline-none"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchInput;
