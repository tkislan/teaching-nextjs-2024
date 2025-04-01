"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  initialPriceFrom: string | null;
  initialPriceTo: string | null;
  initialSearchText: string | null;
};

export function MarketplaceFilters({
  initialPriceFrom,
  initialPriceTo,
  initialSearchText,
}: Props) {
  const [priceFrom, setPriceFrom] = useState<string>(initialPriceFrom ?? "");
  const [priceTo, setPriceTo] = useState<string>(initialPriceTo ?? "");
  const [searchText, setSearchText] = useState<string>(initialSearchText ?? "");

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
