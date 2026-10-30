import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section
      className="relative flex flex-col items-center bg-cover bg-center bg-no-repeat pt-24 pb-28 text-center text-white"
      style={{ backgroundImage: "url('/images/CTA.png')" }}
    >
      {/* Darkens the raw photo to match the design */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      <div className="relative">
        <h2 className="font-serif text-4xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-[13px] text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>

        <a
          href="#book"
          className="mt-10 inline-flex h-8 items-center gap-2.5 rounded-sm bg-white px-5 text-xs font-bold tracking-wider text-neutral-900 uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </a>
      </div>
    </section>
  );
}

export { CTA };
