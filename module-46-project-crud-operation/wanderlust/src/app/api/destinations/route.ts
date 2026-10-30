import { NextResponse } from "next/server";
import { addPackage, listPackages } from "@/lib/destinations";

// Travel-package CRUD practice:
// GET lists the packages, POST adds one.
// Data lives in an in-memory store (see src/lib/destinations.ts).

export async function GET() {
  return NextResponse.json(listPackages());
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, country, category, price, duration, departureDate, imageUrl, description } =
    body as Record<string, unknown>;

  const isValid =
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof country === "string" &&
    country.trim() !== "" &&
    typeof category === "string" &&
    category.trim() !== "" &&
    typeof price === "number" &&
    Number.isFinite(price) &&
    price >= 0 &&
    typeof duration === "string" &&
    duration.trim() !== "" &&
    typeof departureDate === "string" &&
    departureDate.trim() !== "";

  if (!isValid) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 },
    );
  }

  const created = addPackage({
    name,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl: typeof imageUrl === "string" ? imageUrl : "",
    description: typeof description === "string" ? description : "",
  });

  console.log("[destination-api] received POST:", JSON.stringify(created));

  return NextResponse.json(created, { status: 201 });
}
