"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const categories = ["Beach", "Mountain", "City", "Adventure", "Historical"];

const EditDestinsationDialog = ({
  id,
  onUpdated,
}: {
  id: string;
  onUpdated?: () => void;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load the current data each time the dialog opens, so the form is pre-filled
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError(null);
    fetch(`${API_URL}/destination/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => setDestination(data))
      .catch(() => setError("Could not load this destination."));
  }, [open, id]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = Object.fromEntries(formData.entries());

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/destination/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updated, price: Number(updated.price) }),
      });
      if (!res.ok) throw new Error("Update failed");

      setOpen(false);
      router.refresh();
      onUpdated?.();
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-[clamp(20px,3.44vw,44px)] gap-1.5 rounded-[4px] border-neutral-300 px-[clamp(8px,1.52vw,16px)] text-[clamp(8.5px,1.52vw,18px)] font-medium text-neutral-900 hover:bg-neutral-50"
          >
            <Pencil className="size-[clamp(8px,1.52vw,18px)]" />
            Edit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Travel Package</DialogTitle>
          <DialogDescription>
            Make changes here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {!destination && !error && (
          <p className="text-sm text-neutral-500">Loading...</p>
        )}

        {destination && (
          <form onSubmit={handleUpdate} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Destination Name</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={destination.name}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  name="country"
                  defaultValue={destination.country}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  name="category"
                  defaultValue={destination.category}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-price">Price (USD)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min="0"
                  defaultValue={String(destination.price)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  defaultValue={destination.duration}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-date">Departure Date</Label>
              <Input
                id="edit-date"
                name="departureDate"
                type="date"
                defaultValue={destination.departureDate}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="imageUrl"
                type="url"
                defaultValue={destination.imageUrl ?? ""}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                defaultValue={destination.description ?? ""}
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {!destination && error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinsationDialog;