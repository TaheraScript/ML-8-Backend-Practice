import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111111] px-14 pt-16">
      <p className="font-serif text-[64px] leading-none font-bold text-white">
        Wanderlast
      </p>
      <p className="mt-5 text-[13px] text-neutral-300">
        Your gateway to extraordinary travel experiences around the world.
      </p>

      <div className="mt-12 grid gap-8 pb-14 sm:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_1fr]">
        <div className="max-w-[230px]">
          <h3 className="font-serif text-[13px] tracking-wider text-white uppercase">
            Newsletter
          </h3>
          <p className="mt-3 text-[11px] text-neutral-400">
            Subscribe for exclusive travel deals and inspiration.
          </p>
          <form className="relative mt-4">
            <input
              type="email"
              placeholder="Enter email"
              aria-label="Email address"
              className="h-8 w-full rounded-md bg-neutral-800 pr-10 pl-3 text-[13px] text-neutral-200 outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-brand/60"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute top-1 right-1 flex size-6 items-center justify-center rounded bg-neutral-700 text-neutral-200 transition-colors hover:bg-neutral-600"
            >
              <ArrowUpRight className="size-3.5" />
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-serif text-[13px] tracking-wider text-white uppercase">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-[13px]">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-neutral-300 transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-[13px] tracking-wider text-white uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-2 text-[13px]">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-neutral-300 transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-[13px] tracking-wider text-white uppercase">
            Contact Us
          </h3>
          <p className="mt-4 text-[13px] text-neutral-300">786 901 1622</p>
          <p className="mt-2 text-[13px] text-neutral-300">
            Info@wanderland.com
          </p>
        </div>
      </div>

      <div className="mx-[-56px] flex items-center justify-between border-t border-neutral-800 bg-[#0d0d0d] py-3.5 pl-14 pr-14">
        <p className="text-[11px] text-neutral-500">
          © 2026 Wanderlust. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-neutral-300">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="transition-colors hover:text-brand"
          >
            <XIcon className="size-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-brand"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-brand"
          >
            <InstagramIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
