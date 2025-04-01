"use client";

import Link from "next/link";
import { useState } from "react";
import { MARKETPLACE_CATEGORIES } from "../../../lib/db-constants";

type Props = {
  initialPriceFrom: string | null;
  initialPriceTo: string | null;
  initialSearchText: string | null;
  initialCategory: string | null;
};

export function MarketplaceFilters({
  initialPriceFrom,
  initialPriceTo,
  initialSearchText,
  initialCategory,
}: Props) {
  const [priceFrom, setPriceFrom] = useState<string>(initialPriceFrom ?? "");
  const [priceTo, setPriceTo] = useState<string>(initialPriceTo ?? "");
  const [searchText, setSearchText] = useState<string>(initialSearchText ?? "");
  const [category, setCategory] = useState<string>(initialCategory ?? "");

  const queryParams: { [key: string]: string } = {};
  if (priceFrom != "") {
    queryParams["priceFrom"] = priceFrom;
  }
  if (priceTo != "") {
    queryParams["priceTo"] = priceTo;
  }
  if (searchText != "") {
    queryParams["searchText"] = searchText;
  }
  if (category != "") {
    queryParams["category"] = category;
  }

  return (
    <div>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Price from:
        <input
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Price to:
        <input value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Search:
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </label>
      <label className="my-4 flex items-center gap-2">
        Category:
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => {
            console.log("Category select:", e.target.value);
            setCategory(e.target.value);
          }}
        >
          <option value="" disabled>
            Select category
          </option>
          {Object.entries(MARKETPLACE_CATEGORIES).map(
            ([categoryValue, { displayValue }]) => (
              <option key={categoryValue} value={categoryValue}>
                {displayValue}
              </option>
            )
          )}
        </select>
        <button
          className="btn btn-circle btn-xs btn-outline"
          onClick={() => {
            setCategory("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </label>
      <Link
        className="btn"
        href={{
          pathname: "/marketplace",
          query: queryParams,
        }}
      >
        Search
      </Link>
    </div>
  );
}
