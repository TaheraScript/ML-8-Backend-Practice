"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    photo: "/images/person2.png",
    quote:
      '"The Bali Trip Was Absolutely Magical Every Detail Was Perfectly Planned The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
  },
  {
    photo: "/images/person1.png",
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
  },
  {
    photo: "/images/person2.png",
    quote:
      '"Tokyo With Our Local Guide Was Life Changing The Food Tours And Hidden Temples Made Every Moment Feel Special."',
    name: "David Okafor",
    location: "Lagos, Nigeria",
  },
  {
    photo: "/images/person1.png",
    quote:
      '"Santorini Was Everything We Imagined The Cliffside Sunsets And Calm Blue Sea Made This The Trip Of A Lifetime."',
    name: "Emma Müller",
    location: "Berlin, Germany",
  },
];

function CarouselArrow({ direction }: { direction: "prev" | "next" }) {
  const { scrollPrev, scrollNext } = useCarousel();
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={isPrev ? scrollPrev : scrollNext}
      aria-label={isPrev ? "Previous reviews" : "Next reviews"}
      className="flex size-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-brand hover:text-brand"
    >
      {isPrev ? (
        <ArrowLeft className="size-4" strokeWidth={1.75} />
      ) : (
        <ArrowRight className="size-4" strokeWidth={1.75} />
      )}
    </button>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-16">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-5xl px-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-4xl text-neutral-900">
              What Travelers Say
            </h2>
            <p className="mt-2.5 text-[13px] text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CarouselArrow direction="prev" />
            <CarouselArrow direction="next" />
          </div>
        </div>

        <CarouselContent className="mt-7">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="basis-full sm:basis-1/2">
              <article className="flex h-full justify-between gap-4 border border-neutral-200 bg-white p-5">
                <div className="flex flex-1 flex-col justify-between">
                  <p className="text-[15px] leading-snug text-neutral-900">
                    {testimonial.quote}
                  </p>
                  <footer className="mt-6">
                    <p className="text-[13px] font-semibold text-brand">
                      — {testimonial.name}
                    </p>
                    <p className="mt-1 pl-3 text-[11px] text-neutral-500">
                      {testimonial.location}
                    </p>
                  </footer>
                </div>

                <Image
                  src={testimonial.photo}
                  alt={`Portrait of ${testimonial.name}`}
                  width={134}
                  height={160}
                  className="h-[160px] w-[134px] shrink-0 self-center object-cover"
                />
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export { Testimonials };
