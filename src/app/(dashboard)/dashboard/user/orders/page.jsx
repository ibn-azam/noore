"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Magnifier,
  ShoppingBag,
  Clock,
  CircleCheck,
  Xmark,
} from "@gravity-ui/icons";

const orders = [
  {
    id: "NOR-10245",
    product: "Oud Royale",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "November 24, 2026",
    amount: 4500,
    status: "Delivered",
  },
  {
    id: "NOR-10244",
    product: "Velvet Rose",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "November 22, 2026",
    amount: 3200,
    status: "Processing",
  },
  {
    id: "NOR-10243",
    product: "Amber Essence",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "November 20, 2026",
    amount: 2800,
    status: "Pending",
  },
  {
    id: "NOR-10242",
    product: "Royal Musk",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "November 18, 2026",
    amount: 5500,
    status: "Cancelled",
  },
];

function UserOrdersPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Orders");

  const statuses = [
    "All Orders",
    "Pending",
    "Processing",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === "All Orders" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [search, selectedStatus]);

  const statusStyles = {
    Delivered: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="my-4 mx-auto w-[calc(100%_-_2rem)] space-y-4">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
          My Account
        </p>

        <h1 className="mt-2 font-heading text-3xl font-semibold text-[#25221F] sm:text-4xl">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-[#77716A]">
          View and manage all your perfume purchases.
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Total Orders",
            value: orders.length,
            icon: ShoppingBag,
          },
          {
            title: "In Progress",
            value: orders.filter((o) =>
              ["Pending", "Processing"].includes(o.status),
            ).length,
            icon: Clock,
          },
          {
            title: "Delivered",
            value: orders.filter((o) => o.status === "Delivered").length,
            icon: CircleCheck,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-2xl border border-[#E8E1D6] bg-white p-5"
            >
              <div>
                <p className="text-sm text-[#77716A]">{stat.title}</p>
                <h3 className="mt-2 font-heading text-3xl font-semibold text-[#25221F]">
                  {stat.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#B08D57]">
                <Icon width={23} height={23} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Container */}
      <div className="overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white">
        {/* Search and Filters */}
        <div className="space-y-5 border-b border-[#E8E1D6] p-5">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#25221F]">
              Order History
            </h2>
            <p className="mt-1 text-sm text-[#77716A]">
              Find and track your previous orders.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Magnifier
                width={18}
                height={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99918A]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order ID or product..."
                className="w-full rounded-xl border border-[#E8E1D6] bg-[#FDFBF7] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#B08D57]"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                    selectedStatus === status
                      ? "bg-[#25221F] text-white"
                      : "border border-[#E8E1D6] text-[#77716A] hover:border-[#B08D57] hover:text-[#B08D57]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="divide-y divide-[#E8E1D6]">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-5 p-5 transition hover:bg-[#FDFBF7] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="h-20 w-20 rounded-xl border border-[#E8E1D6] bg-[#F8F5EF] object-cover"
                  />

                  <div>
                    <h3 className="font-medium text-[#25221F]">
                      {order.product}
                    </h3>

                    <p className="mt-1 text-xs text-[#77716A]">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-xs text-[#99918A]">{order.date}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                  <div>
                    <p className="text-xs text-[#99918A]">Total Amount</p>
                    <p className="mt-1 font-semibold text-[#25221F]">
                      ৳{order.amount.toLocaleString("en-BD")}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>

                  <Link
                    href={`/dashboard/customer/orders/${order.id}`}
                    className="rounded-lg border border-[#E8E1D6] px-4 py-2 text-xs font-semibold text-[#25221F] transition hover:border-[#B08D57] hover:text-[#B08D57]"
                  >
                    View Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#B08D57]">
              {search ? (
                <Magnifier width={27} height={27} />
              ) : (
                <ShoppingBag width={27} height={27} />
              )}
            </div>

            <h3 className="mt-5 font-heading text-2xl font-semibold text-[#25221F]">
              No orders found
            </h3>

            <p className="mt-2 text-sm text-[#77716A]">
              Try changing your search or order status filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedStatus("All Orders");
              }}
              className="mt-5 text-sm font-semibold text-[#B08D57] hover:text-[#25221F]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Continue Shopping */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#F8F5EF] p-6 sm:flex-row">
        <div>
          <h3 className="font-heading text-xl font-semibold text-[#25221F]">
            Discover Your Next Signature Scent
          </h3>
          <p className="mt-1 text-sm text-[#77716A]">
            Explore our exclusive fragrance collection.
          </p>
        </div>

        <Link
          href="/collection"
          className="btn-primary whitespace-nowrap px-6 py-3"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}

export default UserOrdersPage;
