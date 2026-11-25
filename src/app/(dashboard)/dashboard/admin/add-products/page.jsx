
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  X,
  Plus,
} from "lucide-react";
import { uploadImageToImgbb } from "@/lib/actions/uploadImage";

function AddProductsPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    sku: "",
    description: "",
    status: "Active",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    // Revoke previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Remove selected image
  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");
    setInputKey((prev) => prev + 1);
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedImage) {
      setError("Please upload a product image.");
      return;
    }

    if (
      formData.oldPrice &&
      Number(formData.oldPrice) < Number(formData.price)
    ) {
      setError("Previous price should not be lower than selling price.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare image for ImgBB
      const imageData = new FormData();
      imageData.append("image", selectedImage);

      // Upload image to ImgBB
      const uploadResult = await uploadImageToImgbb(imageData);

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(
          uploadResult.error || "Failed to upload product image."
        );
      }

      // Prepare product data
      const productData = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice
          ? Number(formData.oldPrice)
          : null,
        stock: Number(formData.stock),
        image: uploadResult.url,
      };

      console.log("Product Data:", productData);

      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/perfume`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  }
);

const result = await response.json();

if (!response.ok) {
  throw new Error(result.message || "Failed to add product.");
}

      setSuccess("Product Added Successfully!");

       setFormData({
  name: "",
  category: "",
  price: "",
  oldPrice: "",
  stock: "",
  sku: "",
  description: "",
  status: "Active",
});

removeImage();

    } catch (err) {
      console.error("Product submission error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="my-4 mx-auto w-[calc(100%_-_2rem)] space-y-4">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
       <div>
          <h1 className="font-heading text-3xl font-semibold text-[#25221F]">
            Add New Product
          </h1>
          <p className="mt-1 text-sm text-[#77716A]">
            Add a new fragrance to your Noore collection.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Main Information */}
          <div className="space-y-6 lg:col-span-2">

            {/* Product Information */}
            <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5 sm:p-6">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-semibold text-[#25221F]">
                  Product Information
                </h2>
                <p className="mt-1 text-sm text-[#A49D93]">
                  Enter the basic details of your product.
                </p>
              </div>

              <div className="space-y-5">

                {/* Product Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#55504A]">
                    Product Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Oud Royale"
                    required
                    className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none transition focus:border-[#B08D57]"
                  />
                </div>

                {/* Category and SKU */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#55504A]">
                      Category <span className="text-red-500">*</span>
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
                    >
                      <option value="">Select category</option>
                      <option value="Woody & Oriental">
                        Woody & Oriental
                      </option>
                      <option value="Floral">Floral</option>
                      <option value="Fresh & Musky">
                        Fresh & Musky
                      </option>
                      <option value="Warm & Spicy">
                        Warm & Spicy
                      </option>
                      <option value="Citrus">Citrus</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#55504A]">
                      Product SKU
                    </label>

                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="e.g. NOR-001"
                      className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#55504A]">
                    Product Description <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="Describe the fragrance, its notes, character, and appeal..."
                    className="w-full resize-none rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none transition focus:border-[#B08D57]"
                  />
                </div>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5 sm:p-6">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-semibold text-[#25221F]">
                  Pricing & Inventory
                </h2>
                <p className="mt-1 text-sm text-[#A49D93]">
                  Set your product price and available stock.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Selling Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#55504A]">
                    Selling Price (BDT) <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#A49D93]">
                      ৳
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="1"
                      required
                      placeholder="1850"
                      className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] py-3 pl-9 pr-4 text-sm outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                {/* Previous Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#55504A]">
                    Previous Price (BDT)
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#A49D93]">
                      ৳
                    </span>

                    <input
                      type="number"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      min="0"
                      placeholder="2200"
                      className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] py-3 pl-9 pr-4 text-sm outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#55504A]">
                    Available Stock <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    placeholder="e.g. 25"
                    className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#55504A]">
                    Product Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Product Image */}
            <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5">
              <h2 className="font-heading text-xl font-semibold text-[#25221F]">
                Product Image
              </h2>

              <p className="mt-1 text-sm text-[#A49D93]">
                Upload a high-quality product photo.
              </p>

              <div className="mt-5">

                {imagePreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-[#E8E1D6]">
                    <div className="relative aspect-square w-full bg-[#F8F5EF]">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-50"
                      aria-label="Remove product image"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={`product-image-${inputKey}`}
                    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D9D0C3] bg-[#FDFBF7] px-4 text-center transition hover:border-[#B08D57] hover:bg-[#F8F5EF]"
                  >
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#F0E9DD] text-[#B08D57]">
                      <ImagePlus size={26} />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-[#25221F]">
                      Upload Product Image
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#A49D93]">
                      Click to browse or select an image
                    </p>

                    <p className="mt-3 text-[11px] text-[#B5AEA4]">
                      PNG, JPG or WEBP · Max 5MB
                    </p>
                  </label>
                )}

                <input
                  key={inputKey}
                  id={`product-image-${inputKey}`}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview && (
                  <label
                    htmlFor={`product-image-${inputKey}`}
                    className="mt-3 block w-full cursor-pointer rounded-xl border border-[#E8E1D6] py-2.5 text-center text-sm font-medium text-[#77716A] transition hover:border-[#B08D57] hover:text-[#B08D57]"
                  >
                    Change Image
                  </label>
                )}
              </div>
            </div>

            {/* Publish Product */}
            <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5">
              <h2 className="font-heading text-xl font-semibold text-[#25221F]">
                Publish Product
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#77716A]">
                Review your product details before adding it to your Noore
                collection.
              </p>

              <div className="mt-5 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25221F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#B08D57] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus size={17} />
                  {isSubmitting ? "Uploading & Saving..." : "Add Product"}
                </button>

                <Link
                  href="/dashboard/admin/products"
                  className="block w-full rounded-xl border border-[#E8E1D6] px-4 py-3 text-center text-sm font-semibold text-[#77716A] transition hover:bg-[#F8F5EF]"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddProductsPage;
