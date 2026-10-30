"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditDestinsationDialog from "@/components/destination/EditDestinsationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";

const API_URL = "http://localhost:5000";

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate: string;
  imageUrl?: string;
  description?: string;
};

// Static mockup values (the design shows these even though the CRUD
// store does not track reviews yet).
const RATING = "4.9";
const REVIEW_COUNT = 234;
const DEFAULT_BOOKING_DATE = "2026-05-15";

const MOCKUP_OVERVIEW =
  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function DetailPage() {
  const params = useParams<{ id: string }>();
  const [travelPackage, setTravelPackage] = useState<Destination | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadPackage = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/destination/${params.id}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Request failed");

      const data: Destination | null = await response.json();
      if (data) {
        setTravelPackage(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, [params.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPackage();
  }, [loadPackage]);

  if (notFound) {
    return (
      <main className="px-[clamp(20px,5.5vw,80px)] pt-[clamp(20px,4.7vw,68px)] pb-16 text-center">
        <p className="text-sm text-neutral-500">
          This destination does not exist.
        </p>
        <Link
          href="/destinations"
          className="mt-4 inline-flex text-sm text-brand underline"
        >
          Back to Destinations
        </Link>
      </main>
    );
  }

  if (!travelPackage) {
    return (
      <main className="px-[clamp(20px,5.5vw,80px)] pt-[clamp(20px,4.7vw,68px)] pb-16">
        <p className="text-sm text-neutral-500">Loading destination...</p>
      </main>
    );
  }

  return (
    <main className="px-[clamp(20px,5.5vw,80px)] pt-[clamp(18px,4.7vw,68px)] pb-16">
      {/* Back / actions row */}
      <div className="flex items-center justify-between">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-[clamp(10px,1.65vw,21px)] text-neutral-600 transition-colors hover:text-brand"
        >
          <ArrowRight className="size-[clamp(10px,1.65vw,21px)] rotate-180" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-[clamp(4px,0.96vw,12px)]">
          <EditDestinsationDialog id={params.id} onUpdated={loadPackage} />
          <DeleteDestinationDialog id={params.id}></DeleteDestinationDialog>
        </div>
      </div>

      {/* Hero image */}
      {travelPackage.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- user-provided URL, no remotePatterns allowlist
        <img
          src={travelPackage.imageUrl}
          alt={travelPackage.name}
          className="mt-[clamp(8px,1.93vw,28px)] h-[clamp(130px,35.4vw,512px)] w-full rounded-[clamp(3px,0.55vw,8px)] object-cover"
        />
      ) : (
        <div className="mt-[clamp(8px,1.93vw,28px)] flex h-[clamp(130px,35.4vw,512px)] w-full items-center justify-center rounded-[clamp(3px,0.55vw,8px)] bg-neutral-100 text-neutral-400">
          <MapPin className="size-8" />
        </div>
      )}

      {/* Content + booking card */}
      <div className="mt-[clamp(18px,4.96vw,72px)] grid grid-cols-1 gap-[clamp(16px,4.8vw,70px)] lg:grid-cols-[1fr_clamp(170px,29.3vw,360px)]">
        <article>
          <p className="flex items-center gap-1.5 text-[clamp(10px,1.65vw,21px)] text-neutral-600">
            <MapPin className="size-[clamp(10px,1.65vw,21px)]" />
            {travelPackage.country}
          </p>

          <h1 className="mt-[clamp(2px,0.55vw,8px)] font-serif text-[clamp(20px,4vw,58px)] leading-tight text-neutral-900">
            {travelPackage.name}
          </h1>

          <div className="mt-[clamp(6px,1.1vw,16px)] flex flex-wrap items-center gap-[clamp(8px,1.65vw,22px)]">
            <p className="flex items-center gap-1 text-[clamp(9px,1.6vw,20px)] text-neutral-700">
              <Star className="size-[clamp(9px,1.6vw,20px)] fill-neutral-800 text-neutral-800" />
              <span className="font-semibold">{RATING}</span>
              <span className="text-neutral-500">({REVIEW_COUNT} reviews)</span>
            </p>
            <p className="flex items-center gap-1.5 text-[clamp(9px,1.6vw,20px)] text-neutral-700">
              <Calendar className="size-[clamp(9px,1.6vw,20px)]" />
              {travelPackage.duration}
            </p>
          </div>

          <h2 className="mt-[clamp(14px,3vw,42px)] text-[clamp(12px,2.34vw,32px)] font-medium text-neutral-900">
            Overview
          </h2>
          <p className="mt-[clamp(4px,1.1vw,14px)] text-[clamp(9.5px,1.65vw,21px)] leading-relaxed text-neutral-600">
            {travelPackage.description || MOCKUP_OVERVIEW}
          </p>

          <h2 className="mt-[clamp(14px,3vw,42px)] text-[clamp(12px,2.34vw,32px)] font-medium text-neutral-900">
            Highlights
          </h2>
          <p className="mt-[clamp(4px,1.1vw,14px)] text-[clamp(9.5px,1.65vw,21px)] leading-relaxed text-neutral-600">
            {MOCKUP_OVERVIEW}
          </p>

          <ul className="mt-[clamp(10px,2.34vw,32px)] grid grid-cols-1 gap-x-[clamp(24px,5.5vw,74px)] gap-y-[clamp(5px,1.2vw,15px)] sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-[clamp(9px,1.55vw,19px)] text-neutral-700"
              >
                <Check className="size-[clamp(9px,1.5vw,18px)] text-green-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </article>

        {/* Booking card */}
        <aside className="h-fit rounded-[clamp(4px,0.83vw,12px)] border border-neutral-200 bg-white p-[clamp(10px,1.65vw,24px)]">
          <p className="text-[clamp(9px,1.5vw,18px)] text-neutral-500">
            Starting from
          </p>
          <p className="mt-[clamp(2px,0.55vw,8px)] text-[clamp(16px,3vw,44px)] leading-none font-bold text-brand">
            ${travelPackage.price}
          </p>
          <p className="mt-[clamp(2px,0.55vw,8px)] text-[clamp(9px,1.5vw,18px)] text-neutral-500">
            per person
          </p>

          <Input
            type="date"
            defaultValue={DEFAULT_BOOKING_DATE}
            className="mt-[clamp(8px,1.38vw,20px)] h-[clamp(22px,3.58vw,46px)] rounded-[4px] border-neutral-200 bg-[#eef3f4] text-center text-[clamp(9px,1.5vw,18px)] text-neutral-700"
          />

          <Button className="mt-[clamp(8px,1.38vw,20px)] h-[clamp(24px,4vw,52px)] w-full gap-2 rounded-[4px] bg-brand text-[clamp(9px,1.55vw,19px)] font-medium text-white hover:bg-brand/90">
            Book Now
            <ArrowRight className="size-[clamp(9px,1.52vw,18px)]" />
          </Button>

          <ul className="mt-[clamp(10px,1.65vw,24px)] space-y-[clamp(6px,0.83vw,12px)]">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-[clamp(8.5px,1.45vw,18px)] text-neutral-700"
              >
                <Check className="size-[clamp(8px,1.38vw,18px)] text-green-600" />
                {perk}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

export default DetailPage;