"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

const categories = ["Beach", "Mountain", "City", "Adventure", "Historical"];

type FormField =
  | "name"
  | "country"
  | "category"
  | "price"
  | "duration"
  | "departureDate"
  | "imageUrl"
  | "description";

type FormData = Record<FormField, string>;
type FormErrors = Partial<Record<FormField, string>>;

const initialForm: FormData = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[11px] text-red-500">{message}</p>;
}

// Controls share the mockup's tinted, tight-rounded look
const controlClass = "h-[30px] rounded-[5px] bg-[#f9fafb]";

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <Label className="text-[13px] font-semibold text-neutral-900">
      {children}
    </Label>
  );
}

function AddDestinationPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const clearError = (field: FormField) =>
    errors[field] && setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleChange =
    (field: FormField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      clearError(field);
    };

  const handleCategoryChange = (category: string | null) => {
    setForm((prev) => ({ ...prev, category: category ?? "" }));
    clearError("category");
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (!form.name.trim()) next.name = "Destination name is required.";
    if (!form.country.trim()) next.country = "Country is required.";
    if (!form.category) next.category = "Please choose a category.";

    if (!form.price.trim()) {
      next.price = "Price is required.";
    } else {
      const price = Number(form.price);
      if (Number.isNaN(price) || price < 0) {
        next.price = "Enter a valid amount (e.g. 1299).";
      }
    }

    if (!form.duration.trim()) next.duration = "Duration is required.";
    if (!form.departureDate) next.departureDate = "Departure date is required.";

    if (form.imageUrl.trim() && !/^https?:\/\/\S+$/.test(form.imageUrl.trim())) {
      next.imageUrl = "Enter a valid URL (https://...).";
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   const res= await fetch('http://localhost:5000/add-destination',{
    method:'POST',
    headers:{
        'Content-Type': "application/json",
    },
    body: JSON.stringify(form)
   }) 

   const data = await res.json()
   console.log(data)

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setServerError(null);
    try {
      const response = await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (!response.ok) throw new Error("Request failed");
      router.push("/destinations");
    } catch {
      setServerError("Something went wrong while saving. Please try again.");
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    setServerError(null);
    router.back();
  };

  return (
    <>
      <main className="px-[clamp(24px,5.3vw,76px)] pt-[clamp(24px,6vw,88px)] pb-16">
        <h1 className="font-serif text-[clamp(1.9rem,4.55vw,3rem)] font-bold leading-none text-neutral-900">
          Add New Travel Package
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-[clamp(28px,6vw,88px)] w-full max-w-[492px] rounded-md border border-neutral-200 bg-white p-6"
        >
          <div className="space-y-3.5">
            <div className="space-y-2">
              <LabelText>Destination Name</LabelText>
              <Input
                id="name"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Bali Paradise"
                aria-invalid={!!errors.name}
                className={controlClass}
              />
              <FieldError message={errors.name} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <LabelText>Country</LabelText>
                <Input
                  id="country"
                  value={form.country}
                  onChange={handleChange("country")}
                  placeholder="Indonesia"
                  aria-invalid={!!errors.country}
                  className={controlClass}
                />
                <FieldError message={errors.country} />
              </div>

              <div className="space-y-2">
                <LabelText>Category</LabelText>
                <Select
                  value={form.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger
                    id="category"
                    aria-invalid={!!errors.category}
                    className={cn(controlClass, "w-full")}
                  >
                    <SelectValue placeholder="Beach" className="text-brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <LabelText>Price (USD)</LabelText>
                <Input
                  id="price"
                  type="text"
                  inputMode="numeric"
                  value={form.price}
                  onChange={handleChange("price")}
                  placeholder="e.g., 1299"
                  aria-invalid={!!errors.price}
                  className={controlClass}
                />
                <FieldError message={errors.price} />
              </div>

              <div className="space-y-2">
                <LabelText>Duration</LabelText>
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={handleChange("duration")}
                  placeholder="e.g., 7 Days/6 Nights"
                  aria-invalid={!!errors.duration}
                  className={controlClass}
                />
                <FieldError message={errors.duration} />
              </div>
            </div>

            <div className="space-y-2">
              <LabelText>Departure Date</LabelText>
              <Input
                id="departure-date"
                type="date"
                value={form.departureDate}
                onChange={handleChange("departureDate")}
                aria-invalid={!!errors.departureDate}
                className={controlClass}
              />
              <FieldError message={errors.departureDate} />
            </div>

            <div className="space-y-2">
              <LabelText>Image URL</LabelText>
              <Input
                id="image-url"
                type="url"
                value={form.imageUrl}
                onChange={handleChange("imageUrl")}
                placeholder="https://example.com/image.jpg"
                aria-invalid={!!errors.imageUrl}
                className={controlClass}
              />
              <FieldError message={errors.imageUrl} />
            </div>

            <div className="space-y-2">
              <LabelText>Description</LabelText>
              <Textarea
                id="description"
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Describe the travel experience..."
                className="h-[92px] rounded-[5px] bg-[#f9fafb]"
              />
            </div>
          </div>

          {serverError && (
            <p className="mt-4 text-right text-[11px] text-red-500">
              {serverError}
            </p>
          )}

          <div className="mt-6 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              className="h-8 gap-1.5 rounded-[4px] border-red-300 px-2 text-xs font-semibold text-red-500 hover:border-red-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="size-3" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="h-8 gap-1.5 rounded-[4px] bg-brand px-2.5 text-xs font-semibold text-white hover:bg-brand/90"
            >
              <Save className="size-3" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default AddDestinationPage;
