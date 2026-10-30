import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

function WhyChoose() {
  return (
    <section className="bg-[#e9fafa] px-6 pt-20 pb-14">
      <h2 className="text-center font-serif text-4xl text-neutral-900">
        Why Choose Wanderlust
      </h2>
      <p className="mt-3 text-center text-[13px] text-neutral-500">
        Your trusted partner for exceptional travel experiences
      </p>

      <div className="mx-auto mt-8 grid max-w-[780px] gap-4 text-left sm:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="bg-[#fbfbfb] p-6 shadow-sm">
            <Image
              src={feature.icon}
              alt=""
              width={48}
              height={48}
              className="h-10 w-10"
            />
            <h3 className="mt-5 font-serif text-xl text-neutral-900">
              {feature.title}
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-neutral-500">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export { WhyChoose };
