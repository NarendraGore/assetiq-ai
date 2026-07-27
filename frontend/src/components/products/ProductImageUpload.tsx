"use client";

import { useRef, useState, useEffect } from "react";

import Image from "next/image";

import {
  ImagePlus,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProductImageUploadProps {
  value?: string;

  onChange: (value: string) => void;
}

export default function ProductImageUpload({
  value,
  onChange,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(
    value ?? ""
  );

  useEffect(() => {
    setPreview(value ?? "");
  }, [value]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    // Replace this later with actual uploaded URL
    onChange(imageUrl);
  };

  const removeImage = () => {
    setPreview("");

    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 transition-all hover:border-primary hover:bg-muted/40"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="relative h-52 w-full overflow-hidden rounded-lg">
            <Image
              src={preview}
              alt="Product"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <>
            <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />

            <p className="font-medium">
              Click to upload product image
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              PNG, JPG or WEBP
            </p>

            <Button
              type="button"
              variant="secondary"
              className="mt-5"
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Choose Image
            </Button>
          </>
        )}
      </div>

      {preview && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
}