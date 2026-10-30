import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { cn } from "cn";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "#bookings", active: false },
 
];

const text = "text-[clamp(10px,1.3vw,19px)] font-semibold";

function Navbar() {
  return (
    <header className="bg-background">
      <nav
        aria-label="Main"
        className="grid h-[clamp(28px,4.2vw,60px)] grid-cols-[1fr_auto_1fr] items-center px-[clamp(16px,3.2vw,48px)]"
      >
        <ul className="flex items-center gap-[clamp(10px,1.8vw,28px)]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "transition-colors hover:text-brand",
                text,
                link.active ? "text-brand underline" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/" aria-label="Wanderlast home" className="shrink-0">
        <Image
          src="/images/Wanderlast.png"
          alt="Wanderlast"
          width={162}
          height={24}
          priority
          className="h-[clamp(10px,1.64vw,24px)] w-auto"
        />
      </Link>

      <div
        className={cn(
          "flex items-center justify-end gap-[clamp(12px,2vw,30px)]",
          text
        )}
      >
        <a href="#profile" className="flex items-center gap-[clamp(5px,0.8vw,12px)] transition-colors hover:text-brand">
          <UserRound className="size-[clamp(10px,1.3vw,19px)]" />
          Profile
        </a>
        <a href="#login" className="transition-colors hover:text-brand">
          Login
        </a>
        <a href="#signup" className="transition-colors hover:text-brand">
          Sign Up
        </a>
      </div>
      </nav>
    </header>
  );
}

export { Navbar };
