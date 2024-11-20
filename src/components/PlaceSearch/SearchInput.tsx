import { ChangeEvent, useCallback, useState } from "react";
import { BiSearch } from "react-icons/bi";

function SearchInput({
  onInputChange = () => {},
}: {
  onInputChange?: (query: string) => void;
}) {
  const [query, setQuery] = useState<string>("Alberts Bike Shop");

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;

      setQuery(newQuery);
      onInputChange(newQuery);
    },
    [onInputChange]
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
