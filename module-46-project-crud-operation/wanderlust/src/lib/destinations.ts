// In-memory travel-package store for the CRUD practice.
// Swap these helpers for a real database (e.g. Prisma + Postgres) later;
// the API route and pages in this project only depend on this module.

export type TravelPackage = {
  id: number;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

// Seed data mirrors the design mockup (six identical demo packages).
const seedData = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop",
    category: "Beach",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?q=80&w=1920&auto=format&fit=crop",
    category: "Beach",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1920&auto=format&fit=crop",
    category: "Mountain",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1920&auto=format&fit=crop",
    category: "Adventure",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1920&auto=format&fit=crop",
    category: "Beach",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=1920&auto=format&fit=crop",
    category: "Adventure",
  },
];

const travelPackages: TravelPackage[] = seedData.map((seed, index) => ({
  id: index + 1,
  name: "Bali Paradise",
  country: "Nepal",
  category: seed.category,
  price: 2700,
  duration: "7 Days/6 Nights",
  departureDate: "2027-01-15",
  imageUrl: seed.imageUrl,
  description: "",
}));
let nextId = seedData.length + 1;

export function listPackages(): TravelPackage[] {
  return [...travelPackages];
}

export function findPackage(id: number): TravelPackage | undefined {
  return travelPackages.find((item) => item.id === id);
}

export function addPackage(
  input: Omit<TravelPackage, "id">,
): TravelPackage {
  const travelPackage = { id: nextId++, ...input };
  travelPackages.push(travelPackage);
  return travelPackage;
}
