
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Oud Royale",
    category: "Woody & Oriental",
    price: 1850,
    stock: 24,
    status: "Active",
    image: "/images/products/oud-royale.webp",
  },
  {
    id: 2,
    name: "Velvet Bloom",
    category: "Floral",
    price: 1550,
    stock: 18,
    status: "Active",
    image: "/images/products/velvet-bloom.webp",
  },
  {
    id: 3,
    name: "Midnight Musk",
    category: "Fresh & Musky",
    price: 1750,
    stock: 0,
    status: "Out of Stock",
    image: "/images/products/midnight-musk.webp",
  },
  {
    id: 4,
    name: "Amber Essence",
    category: "Warm & Spicy",
    price: 1950,
    stock: 12,
    status: "Active",
    image: "/images/products/amber-essence.webp",
  },
];

function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All");

  const categories = [
    "All Categories",
    ...new Set(initialProducts.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" || product.category === category;

    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && product.stock > 0) ||
      (stockFilter === "Out of Stock" && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (
    <section className="my-4 mx-auto w-[calc(100%_-_2rem)] space-y-4">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#25221F]">
            Products
          </h1>
          <p className="mt-1 text-sm text-[#77716A]">
            Manage your perfume collection and inventory.
          </p>
        </div>

        <Link
          href="/dashboard/admin/add-products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25221F] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#B08D57]"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#77716A]">Total Products</p>
            <Package size={20} className="text-[#B08D57]" />
          </div>
          <h3 className="mt-3 font-heading text-3xl font-semibold text-[#25221F]">
            {products.length}
          </h3>
          <p className="mt-1 text-xs text-[#A49D93]">
            Products in your collection
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5">
          <p className="text-sm text-[#77716A]">Available Products</p>
          <h3 className="mt-3 font-heading text-3xl font-semibold text-[#25221F]">
            {products.filter((product) => product.stock > 0).length}
          </h3>
          <p className="mt-1 text-xs text-[#A49D93]">
            Currently available for sale
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5">
          <p className="text-sm text-[#77716A]">Out of Stock</p>
          <h3 className="mt-3 font-heading text-3xl font-semibold text-[#25221F]">
            {products.filter((product) => product.stock === 0).length}
          </h3>
          <p className="mt-1 text-xs text-[#A49D93]">
            Products needing restock
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-[#E8E1D6] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold text-[#25221F]">
              All Products
            </h2>
            <p className="mt-1 text-sm text-[#77716A]">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A49D93]"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#B08D57] sm:w-52"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#55504A] outline-none focus:border-[#B08D57]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#55504A] outline-none focus:border-[#B08D57]"
            >
              <option value="All">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="bg-[#FDFBF7] text-xs uppercase tracking-wider text-[#77716A]">
                <th className="px-5 py-4 font-semibold">Product</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Stock</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0EBE3]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-[#FDFBF7]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#F8F5EF]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-semibold text-[#25221F]">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-[#77716A]">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#25221F]">
                      ৳ {product.price.toLocaleString("en-BD")}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#55504A]">
                      {product.stock} units
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.stock > 0 ? "Active" : "Out of Stock"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/products/${product.id}`}
                          aria-label={`View ${product.name}`}
                          className="rounded-lg p-2 text-[#77716A] transition hover:bg-[#F8F5EF] hover:text-[#B08D57]"
                        >
                          <Eye size={17} />
                        </Link>

                        <Link
                          href={`/dashboard/admin/products/edit/${product.id}`}
                          aria-label={`Edit ${product.name}`}
                          className="rounded-lg p-2 text-[#77716A] transition hover:bg-[#F8F5EF] hover:text-[#B08D57]"
                        >
                          <Pencil size={17} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                          className="rounded-lg p-2 text-[#A49D93] transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <Package
                      size={30}
                      className="mx-auto text-[#B08D57]"
                    />
                    <p className="mt-3 text-sm font-semibold text-[#25221F]">
                      No products found
                    </p>
                    <p className="mt-1 text-xs text-[#A49D93]">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
