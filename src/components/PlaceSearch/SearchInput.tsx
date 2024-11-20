import { ChangeEvent, useCallback, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";

function SearchInput({
  onInputChange = () => {},
}: {
  onInputChange?: (query: string) => void;
}) {
  const [query, setQuery] = useState<string>("Arctic Ice Cream");

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;

      setQuery(newQuery);
      onInputChange(newQuery);
    },
    [onInputChange]
  );

  const handleClearBtnClick = useCallback(() => {
    setQuery("");
    onInputChange("");
  }, [onInputChange]);

  return (
    <div className="flex gap-4 p-4 items-center shadow-md bg-white rounded">
      <BiSearch className="h-5 w-5 text-gray-400" />
      <input
        className="text-base flex-1 outline-none"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleClearBtnClick}>
        <BiX className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}

export default SearchInput;
