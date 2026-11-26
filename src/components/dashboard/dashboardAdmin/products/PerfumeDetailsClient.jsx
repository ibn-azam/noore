"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Package, ImagePlus, X, Save } from "lucide-react";
import { uploadImageToImgbb } from "@/lib/actions/uploadImage";

function PerfumeDetailsClient({ perfume }) {
  const [currentPerfume, setCurrentPerfume] = useState(perfume);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: perfume.name || "",
    category: perfume.category || "",
    price: perfume.price ?? "",
    oldPrice: perfume.oldPrice ?? "",
    stock: perfume.stock ?? "",
    sku: perfume.sku || "",
    description: perfume.description || "",
    status: perfume.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/*"].includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.oldPrice !== "" &&
      Number(formData.oldPrice) < Number(formData.price)
    ) {
      setError("Previous price should not be lower than selling price.");
      return;
    }

    try {
      setIsSubmitting(true);

      let imageUrl = currentPerfume.image;

      // Upload a new image only if one was selected.
      if (selectedImage) {
        const imageData = new FormData();
        imageData.append("image", selectedImage);

        const uploadResult = await uploadImageToImgbb(imageData);

        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || "Image upload failed.");
        }

        imageUrl = uploadResult.url;
      }

      const productData = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        stock: Number(formData.stock),
        image: imageUrl,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/perfume/${currentPerfume._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update perfume.");
      }

      setCurrentPerfume({
        ...currentPerfume,
        ...productData,
      });

      setSelectedImage(null);
      setSuccess("Perfume updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update perfume error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentPerfume.name || "",
      category: currentPerfume.category || "",
      price: currentPerfume.price ?? "",
      oldPrice: currentPerfume.oldPrice ?? "",
      stock: currentPerfume.stock ?? "",
      sku: currentPerfume.sku || "",
      description: currentPerfume.description || "",
      status: currentPerfume.status || "Active",
    });

    setSelectedImage(null);
    setError("");
    setIsEditing(false);
  };

  return (
    <section className="mx-auto my-4 w-[calc(100%-2rem)] space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/dashboard/admin/products"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#77716A] transition hover:text-[#B08D57]"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>

          <h1 className="font-heading text-3xl font-semibold text-[#25221F]">
            Perfume Details
          </h1>

          <p className="mt-1 text-sm text-[#77716A]">
            View and manage your perfume information.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setError("");
              setSuccess("");
              setIsEditing(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25221F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B08D57]"
          >
            <Pencil size={17} />
            Edit Product
          </button>
        )}
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {success}
        </div>
      )}

      {isEditing ? (
        /* Edit Form */
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#E8E1D6] bg-white p-5 sm:p-8"
        >
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#25221F]">
              Edit Perfume
            </h2>
            <p className="mt-1 text-sm text-[#77716A]">
              Update the product information below.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#55504A]">
                Product Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#55504A]">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
              >
                <option value="">Select Category</option>
                <option value="Woody & Oriental">Woody & Oriental</option>
                <option value="Floral">Floral</option>
                <option value="Fresh & Musky">Fresh & Musky</option>
                <option value="Warm & Spicy">Warm & Spicy</option>
                <option value="Citrus">Citrus</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#55504A]">
                Selling Price (BDT)
              </label>
              <input
                type="number"
                name="price"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#55504A]">
                Previous Price (BDT)
              </label>
              <input
                type="number"
                name="oldPrice"
                min="0"
                step="0.01"
                value={formData.oldPrice}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#55504A]">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#55504A]">
                Product SKU
              </label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
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
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#55504A]">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full resize-y rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#55504A]">
              Product Image
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={currentPerfume.image}
                alt={currentPerfume.name}
                className="size-28 rounded-xl border border-[#E8E1D6] object-cover"
              />

              <div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E8E1D6] px-4 py-3 text-sm font-medium text-[#55504A] transition hover:border-[#B08D57] hover:text-[#B08D57]">
                  <ImagePlus size={17} />
                  Choose New Image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {selectedImage && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#77716A]">
                    <span>{selectedImage.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      aria-label="Remove selected image"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}

                <p className="mt-2 text-xs text-[#A49D93]">
                  JPG, PNG or WEBP. Maximum 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#E8E1D6] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="rounded-xl border border-[#E8E1D6] px-6 py-3 text-sm font-semibold text-[#55504A] transition hover:bg-[#F8F5EF] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25221F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B08D57] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        /* Details View */
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Image */}
          <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5 lg:col-span-2">
            <div className="overflow-hidden rounded-xl bg-[#F8F5EF]">
              <img
                src={currentPerfume.image}
                alt={currentPerfume.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-5">
              <span className="rounded-full bg-[#F8F5EF] px-3 py-1 text-xs font-semibold text-[#B08D57]">
                {currentPerfume.category}
              </span>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-[#25221F]">
                {currentPerfume.name}
              </h2>
              <p className="mt-2 text-sm text-[#77716A]">
                SKU: {currentPerfume.sku || "Not provided"}
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-5 rounded-2xl border border-[#E8E1D6] bg-white p-5 sm:p-7 lg:col-span-3">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#25221F]">
                Product Information
              </h2>
              <p className="mt-1 text-sm text-[#77716A]">
                Complete details about this perfume.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#FDFBF7] p-4">
                <p className="text-xs text-[#77716A]">Selling Price</p>
                <p className="mt-2 text-xl font-semibold text-[#25221F]">
                  ৳ {Number(currentPerfume.price).toLocaleString("en-BD")}
                </p>
              </div>

              <div className="rounded-xl bg-[#FDFBF7] p-4">
                <p className="text-xs text-[#77716A]">Previous Price</p>
                <p className="mt-2 text-xl font-semibold text-[#25221F]">
                  {currentPerfume.oldPrice
                    ? `৳ ${Number(currentPerfume.oldPrice).toLocaleString("en-BD")}`
                    : "Not set"}
                </p>
              </div>

              <div className="rounded-xl bg-[#FDFBF7] p-4">
                <p className="text-xs text-[#77716A]">Available Stock</p>
                <p className="mt-2 flex items-center gap-2 text-xl font-semibold text-[#25221F]">
                  <Package size={19} className="text-[#B08D57]" />
                  {currentPerfume.stock} units
                </p>
              </div>

              <div className="rounded-xl bg-[#FDFBF7] p-4">
                <p className="text-xs text-[#77716A]">Product Status</p>
                <p className="mt-2 text-xl font-semibold text-[#25221F]">
                  {currentPerfume.status || "Active"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#25221F]">
                Description
              </h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#77716A]">
                {currentPerfume.description}
              </p>
            </div>

            <div className="border-t border-[#E8E1D6] pt-4">
              <p className="text-xs text-[#A49D93]">
                Product ID: {currentPerfume._id}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PerfumeDetailsClient;
