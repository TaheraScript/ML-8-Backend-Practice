import { ArrowRight } from "lucide-react";

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "duration", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "people", label: "People", placeholder: "5-10" },
];

function Banner() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-clamp(28px,4.2vw,60px))] flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Banner.png')" }}
    >
      {/* Hero copy (scales with viewport, calibrated to the reference) */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pt-[clamp(8px,2.7vw,40px)] text-center text-white">
        <h1 className="font-serif text-[clamp(2.5rem,5.7vw,5rem)] leading-[1.14]">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-[clamp(14px,2.9vw,42px)] max-w-[clamp(260px,44vw,635px)] text-[clamp(11px,1.47vw,21px)] leading-[1.7] text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-[clamp(16px,3vw,44px)] flex flex-wrap items-center justify-center gap-[clamp(9px,1.7vw,25px)]">
          <a
            href="#explore"
            className="flex h-[clamp(26px,3.96vw,57px)] items-center gap-[clamp(5px,0.9vw,13px)] rounded-sm bg-brand px-[clamp(8px,1.3vw,19px)] text-[clamp(8.5px,1.25vw,18px)] font-bold tracking-wider uppercase transition-colors hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-[clamp(8px,1.36vw,20px)]" />
          </a>
          <a
            href="#destinations"
            className="flex h-[clamp(26px,3.96vw,57px)] items-center rounded-sm bg-white/40 px-[clamp(8px,1.3vw,19px)] text-[clamp(8.5px,1.25vw,18px)] font-bold tracking-wider uppercase backdrop-blur-[2px] transition-colors hover:bg-white/50"
          >
            View Destination
          </a>
        </div>
      </div>

      {/* Search bar pinned to the bottom edge, full bleed */}
      <form
        aria-label="Destination search"
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_0.67fr]"
      >
        {searchFields.map((field) => (
          <div
            key={field.id}
            className="bg-white/40 px-[clamp(8px,1.36vw,20px)] py-[clamp(4px,0.8vw,12px)] backdrop-blur-[2px] lg:border-l lg:border-white/50 lg:first:border-l-0"
          >
            <label
              htmlFor={field.id}
              className="block text-[clamp(9px,1.47vw,21px)] font-semibold leading-none text-neutral-900"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              className="mt-[clamp(4px,0.9vw,13px)] w-full bg-transparent text-[clamp(7.5px,1.2vw,17px)] leading-none text-neutral-800 outline-none placeholder:text-neutral-600"
            />
          </div>
        ))}

        <button
          type="submit"
          className="min-h-[clamp(28px,4vw,56px)] bg-brand text-[clamp(9px,1.7vw,25px)] font-bold text-white transition-colors hover:bg-brand/90"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export { Banner };
