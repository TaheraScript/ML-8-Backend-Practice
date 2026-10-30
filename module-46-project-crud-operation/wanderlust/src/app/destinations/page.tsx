"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// CHANGED: removed the import of TravelPackage from "@/lib/destinations"
// and defined the Express/MongoDB types here (no new file needed)
const API_URL = "http://localhost:5000";

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number | string; // older documents saved price as a string
  duration: string;
  departureDate: string;
  imageUrl?: string;
  description?: string;
};

const categoryOptions = [
  "Category",
  "Beach",
  "Mountain",
  "Adventure",
  "Historical",
  "City",
];

const priceRanges = [
  "Price Range",
  "Under $1000",
  "$1000 - $3000",
  "Above $3000",
];

const sortOptions = ["Sort By", "Newest", "Price: Low to High", "Price: High to Low", "Name"];

// Trigger styled to match the mockup's flat, small-cornered filter bars
function FilterSelect({
  value,
  onValueChange,
  options,
}: {
  value?: string;
  onValueChange: (value: string | null) => void;
  options: string[];
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onValueChange(next ?? null)}
    >
      <SelectTrigger className="h-[clamp(24px,3.9vw,56px)] w-full rounded-[3px] border-neutral-300 text-[clamp(9px,1.25vw,18px)] tracking-wider uppercase data-placeholder:text-neutral-500">
        <SelectValue placeholder={options[0]} />
      </SelectTrigger>
      <SelectContent className="text-[13px]">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DestinationPage() {
  const [packages, setPackages] = useState<Destination[] | null>(null); // CHANGED: type
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  useEffect(() => {
    // CHANGED: load from the Express server (port 5000), not the Next.js /api route
    fetch(`${API_URL}/destinations`)
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json() as Promise<Destination[]>;
      })
      .then(setPackages)
      .catch(() => setFetchError("Could not load travel packages."));
  }, []);

  let visiblePackages = packages ?? [];

  if (category && category !== "Category") {
    visiblePackages = visiblePackages.filter(
      (item) => item.category === category,
    );
  }

  if (priceRange && priceRange !== "Price Range") {
    // CHANGED: Number(item.price) because price can be a string in older documents
    visiblePackages = visiblePackages.filter((item) => {
      const price = Number(item.price);
      if (priceRange === "Under $1000") return price < 1000;
      if (priceRange === "$1000 - $3000")
        return price >= 1000 && price <= 3000;
      if (priceRange === "Above $3000") return price > 3000;
      return true;
    });
  }

  if (sortBy && sortBy !== "Sort By") {
    visiblePackages = [...visiblePackages];
    if (sortBy === "Price: Low to High") {
      visiblePackages.sort((a, b) => Number(a.price) - Number(b.price)); // CHANGED
    } else if (sortBy === "Price: High to Low") {
      visiblePackages.sort((a, b) => Number(b.price) - Number(a.price)); // CHANGED
    } else if (sortBy === "Name") {
      visiblePackages.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return (
    <main className="px-[clamp(24px,5.9vw,84px)] pt-[clamp(28px,8vw,116px)] pb-16">
      <h1 className="font-serif text-[clamp(1.9rem,4.55vw,3rem)] font-bold leading-none text-neutral-900">
        Explore All Destinations
      </h1>
      <p className="mt-[clamp(6px,1.5vw,22px)] text-[clamp(10px,1.4vw,19px)] text-neutral-500">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-[clamp(14px,2.9vw,42px)] grid grid-cols-1 gap-[clamp(10px,1.9vw,27px)] sm:grid-cols-3">
        <FilterSelect
          value={category ?? undefined}
          onValueChange={setCategory}
          options={categoryOptions}
        />

        <FilterSelect
          value={priceRange ?? undefined}
          onValueChange={setPriceRange}
          options={priceRanges}
        />

        <FilterSelect
          value={sortBy ?? undefined}
          onValueChange={setSortBy}
          options={sortOptions}
        />
      </div>

      <p className="mt-[clamp(10px,2.3vw,33px)] text-[clamp(9px,1.36vw,20px)] text-neutral-500">
        Showing {visiblePackages.length} destinations
      </p>

      {fetchError && <p className="mt-6 text-sm text-red-500">{fetchError}</p>}
      {!packages && !fetchError && (
        <p className="mt-6 text-sm text-neutral-500">Loading destinations...</p>
      )}

      {packages && visiblePackages.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">
          No destinations match your filters.{" "}
          <Link href="/add-destination" className="text-brand underline">
            Add a new package
          </Link>
        </p>
      )}

      <div className="mt-[clamp(16px,3.3vw,47px)] grid gap-x-[clamp(10px,1.65vw,24px)] gap-y-[clamp(12px,2vw,30px)] sm:grid-cols-2 lg:grid-cols-3">
        {visiblePackages.map((item) => (
          <article key={item._id}> {/* CHANGED: _id instead of id */}
            <div className="relative">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- user-provided URL, no remotePatterns allowlist
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-[clamp(78px,14.1vw,204px)] w-full rounded-[4px] object-cover"
                />
              ) : (
                <div className="flex h-[clamp(78px,14.1vw,204px)] w-full items-center justify-center rounded-[4px] bg-neutral-100 text-neutral-400">
                  <MapPin className="size-6" />
                </div>
              )}
              <span className="absolute top-[clamp(3px,0.68vw,10px)] right-[clamp(3px,0.68vw,10px)] flex h-[clamp(12px,2vw,29px)] items-center gap-1 rounded-[3px] bg-white/90 px-1.5 text-[clamp(7px,1.13vw,16px)] font-bold text-neutral-900">
                4.5
                <Star className="size-[clamp(6px,1.02vw,15px)] fill-neutral-900 text-neutral-900" />
              </span>
            </div>

            <p className="mt-[clamp(6px,1.36vw,19px)] flex items-center gap-1.5 text-[clamp(8.5px,1.24vw,18px)] text-neutral-500">
              <MapPin className="size-[clamp(7px,1.19vw,17px)]" />
              {item.country}
            </p>

            <div className="mt-[clamp(4px,0.9vw,13px)] flex items-center justify-between">
              <h2 className="font-serif text-[clamp(11px,1.8vw,26px)] text-neutral-900">
                {item.name}
              </h2>
              <p className="flex items-baseline gap-0.5">
                <span className="font-serif text-[clamp(11px,1.93vw,28px)] font-bold text-neutral-900">
                  {/* CHANGED: Number() because price may be a string */}
                  ${Number(item.price).toLocaleString("en-US")}
                </span>
                <span className="text-[clamp(7px,1.02vw,15px)] text-neutral-500">
                  /Person
                </span>
              </p>
            </div>

            <p className="mt-[clamp(4px,0.9vw,13px)] flex items-center gap-1.5 text-[clamp(8.5px,1.24vw,18px)] text-neutral-500">
              <Calendar className="size-[clamp(7px,1.19vw,17px)]" />
              {item.duration}
            </p>

            <Link
              href={`/destinations/${item._id}`}
              className="mt-[clamp(6px,1.7vw,24px)] inline-flex items-center gap-1.5 text-[clamp(8px,1.36vw,20px)] font-semibold tracking-wider text-brand uppercase underline underline-offset-[3px] hover:text-brand/80"
            >
              Book Now
              <ArrowUpRight className="size-[clamp(6px,1.13vw,16px)]" />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default DestinationPage;