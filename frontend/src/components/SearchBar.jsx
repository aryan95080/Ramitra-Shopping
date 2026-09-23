import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  } = useContext(ShopContext);

  const location = useLocation();
  const inputRef = useRef(null);

  // Show search bar only on collection pages
  const isCollectionPage = location.pathname.includes("/collection");

  // Close search automatically when leaving collection page
  useEffect(() => {
    if (!isCollectionPage) {
      setShowSearch(false);
    }
  }, [isCollectionPage, setShowSearch]);

  // Focus input when search bar opens
  useEffect(() => {
    if (showSearch && isCollectionPage) {
      inputRef.current?.focus();
    }
  }, [showSearch, isCollectionPage]);

  // Don't render outside collection page
  if (!showSearch || !isCollectionPage) {
    return null;
  }

  const handleClose = () => {
    setShowSearch(false);
    setSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full border-t border-b border-gray-200 bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-3xl items-center justify-center gap-2 py-4 sm:py-5"
      >
        {/* Search input */}
        <div className="flex w-full items-center rounded-full border border-gray-300 bg-gray-100 px-4 py-2.5 transition focus-within:border-gray-500 focus-within:bg-white sm:px-5">
          <input
            ref={inputRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          <img
            src={assets.search_icon}
            alt=""
            aria-hidden="true"
            className="ml-2 h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
          />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close search"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-100 active:scale-95"
        >
          <img
            src={assets.cross_icon}
            alt=""
            aria-hidden="true"
            className="h-3.5 w-3.5 object-contain sm:h-4 sm:w-4"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;