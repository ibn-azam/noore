
"use client";

import React from "react";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";

const recentOrders = [
  {
    id: "#NR-1001",
    customer: "Ayesha Rahman",
    email: "ayesha@example.com",
    product: "Oud Royale",
    date: "Nov 25, 2026",
    amount: 1850,
    payment: "Cash on Delivery",
    status: "Delivered",
  },
  {
    id: "#NR-1002",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    product: "Velvet Bloom",
    date: "Nov 24, 2026",
    amount: 1550,
    payment: "Online Payment",
    status: "Processing",
  },
  {
    id: "#NR-1003",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    product: "Midnight Musk",
    date: "Nov 24, 2026",
    amount: 1750,
    payment: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: "#NR-1004",
    customer: "Sakib Hasan",
    email: "sakib@example.com",
    product: "Amber Essence",
    date: "Nov 23, 2026",
    amount: 1950,
    payment: "Online Payment",
    status: "Cancelled",
  },
  {
    id: "#NR-1005",
    customer: "Maliha Chowdhury",
    email: "maliha@example.com",
    product: "Oud Royale",
    date: "Nov 22, 2026",
    amount: 1850,
    payment: "Cash on Delivery",
    status: "Delivered",
  },
];

const statusStyles = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

function RecentOrders() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-[#E8E1D6] p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-xl font-semibold text-[#25221F]">
            Recent Orders
          </h2>
          <p className="mt-1 text-sm text-[#77716A]">
            Keep track of your latest customer orders.
          </p>
        </div>

        <Link
          href="/dashboard/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B08D57] transition-colors hover:text-[#25221F]"
        >
          View All Orders
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead>
            <tr className="bg-[#FDFBF7] text-xs uppercase tracking-wider text-[#77716A]">
              <th className="px-5 py-4 font-semibold">Order ID</th>
              <th className="px-5 py-4 font-semibold">Customer</th>
              <th className="px-5 py-4 font-semibold">Product</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Payment</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F0EBE3]">
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-[#FDFBF7]"
              >
                <td className="px-5 py-4 text-sm font-semibold text-[#B08D57]">
                  {order.id}
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-[#25221F]">
                    {order.customer}
                  </p>
                  <p className="mt-1 text-xs text-[#A49D93]">
                    {order.email}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-[#55504A]">
                  {order.product}
                </td>

                <td className="px-5 py-4 text-sm text-[#77716A]">
                  {order.date}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-[#25221F]">
                  ৳ {order.amount.toLocaleString("en-BD")}
                </td>

                <td className="px-5 py-4 text-sm text-[#77716A]">
                  {order.payment}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/dashboard/admin/orders`}
                    aria-label={`View ${order.id}`}
                    className="inline-flex size-8 items-center justify-center rounded-lg text-[#77716A] transition-colors hover:bg-[#F8F5EF] hover:text-[#B08D57]"
                  >
                    <Eye size={17} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentOrders;
