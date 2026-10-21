import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();
  const inputRef = useRef(null);

  // Search bar is only available on collection pages
  const isCollectionPage = location.pathname.includes("/collection");

  // Close search automatically when leaving the collection page
  useEffect(() => {
    if (!isCollectionPage) setShowSearch(false);
  }, [isCollectionPage, setShowSearch]);

  // Focus input when the search bar opens
  useEffect(() => {
    if (showSearch && isCollectionPage) inputRef.current?.focus();
  }, [showSearch, isCollectionPage]);

  // Close with the Escape key
  useEffect(() => {
    if (!showSearch) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearch("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showSearch, setShowSearch, setSearch]);

  if (!showSearch || !isCollectionPage) return null;

  const handleClose = () => {
    setShowSearch(false);
    setSearch("");
  };

  const handleClear = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/90 px-3 backdrop-blur sm:px-6">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex w-full max-w-3xl items-center gap-2 py-3 sm:gap-3 sm:py-4"
      >
        {/* Search field */}
        <div className="group flex min-w-0 flex-1 items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3.5 py-2 shadow-sm transition focus-within:border-black focus-within:bg-white focus-within:shadow-md sm:gap-3 sm:px-5 sm:py-2.5">
          <FiSearch
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-gray-400 transition group-focus-within:text-black sm:h-5 sm:w-5"
          />

          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            aria-label="Search products"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
          />

          {/* Clear text button, only when there is text */}
          {search && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search text"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300 active:scale-95"
            >
              <FiX className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Close search bar */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close search"
          className="flex h-10 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95 sm:px-4"
        >
          <FiX className="h-5 w-5 sm:hidden" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;