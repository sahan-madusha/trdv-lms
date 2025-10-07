import React, { useState, useEffect, useRef } from "react";
import { DEBOUNCED_SEARCH_QUERY, ProductSearchType } from "../../Constant";
import { Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";
import { useAuthChecker } from "../../Context";
import { useDebounce } from "use-debounce";
import { getItemListByType } from "./getItemListByType";

interface ISearchProp {
  results: any[];
  selectedItem?: any[];
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  isSelectable?: boolean;
  setSelectedItem?: React.Dispatch<React.SetStateAction<any[]>>;
  searchType?: ProductSearchType;
  placeHolder?: string;
}

export const SearchBar: React.FC<ISearchProp> = ({
  results,
  selectedItem,
  setResults,
  isSelectable = false,
  setSelectedItem = () => {},
  searchType = ProductSearchType.ALL_PRODUCTS,
  placeHolder = "Search here",
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDataFound, setIsDataFound] = useState(false);
  const inputRef = useRef(null);
  const { user } = useAuthChecker();

  const [debouncedQuery] = useDebounce(query, DEBOUNCED_SEARCH_QUERY);

  const { refetch, isFetching } = useQuery<any>({
    queryKey: ["searchQuery", debouncedQuery ?? ""],
    queryFn: async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsDataFound(false);
        setSelectedIndex(-1);
        return [];
      }

      const response: any = await getItemListByType(
        searchType,
        debouncedQuery.trim(),
        { user_id: user?.user_key_id }
      );

      setResults(response);
      setIsDataFound(response?.length == 0);
      setSelectedIndex(-1);
      return response;
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [debouncedQuery]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);
    setIsDataFound(false);
    setSelectedItem([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results || results?.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results?.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? results?.length - 1 : prev - 1));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      e.preventDefault();
      const selectedItem = results[selectedIndex];
      handleSelectItem(selectedItem, selectedIndex);
    }
  };

  const handleSelectItem = (item: any, index: number) => {
    setSelectedIndex(index);
    setQuery(item.name || item.id);
    setSelectedItem([item]);
    setResults([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setSelectedItem([]);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text?.split(regex);
    return (
      <>
        {parts?.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-yellow-200 font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };
  
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="relative">
        <Input
          autoFocus
          ref={inputRef}
          placeholder={placeHolder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          suffix={isFetching && <Loader2 className="animate-spin" size={18} />}
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1.5 text-gray-400 hover:text-red-500 transition"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>

      {query?.length > 0 &&
        isSelectable &&
        results?.length > 0 &&
        selectedItem.length == 0 && (
          <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto z-50">
            {results.map((item, index) => (
              <li
                key={item.id || index}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition ${
                  selectedIndex === index ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectItem(item, index)}
              >
                {highlightMatch(item.name || item.id, debouncedQuery)}
              </li>
            ))}
          </ul>
        )}

      {isDataFound && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <li className="px-4 py-3 text-center text-gray-500">
            No Item were found
          </li>
        </ul>
      )}
    </div>
  );
};