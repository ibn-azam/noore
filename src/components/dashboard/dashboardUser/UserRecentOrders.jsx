import React from "react";
import Link from "next/link";

const recentOrders = [
  {
    id: "NOR-10245",
    product: "Oud Royale",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "Nov 24, 2026",
    amount: 4500,
    status: "Delivered",
  },
  {
    id: "NOR-10244",
    product: "Velvet Rose",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "Nov 22, 2026",
    amount: 3200,
    status: "Processing",
  },
  {
    id: "NOR-10243",
    product: "Amber Essence",
    image: "https://i.ibb.co.com/your-image.jpg",
    date: "Nov 20, 2026",
    amount: 2800,
    status: "Pending",
  },
];

function UserRecentOrders() {
  const statusStyles = {
    Delivered: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8E1D6] bg-white">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#E8E1D6] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-[#25221F]">
            Recent Orders
          </h2>
          <p className="mt-1 text-sm text-[#77716A]">
            Keep track of your latest purchases.
          </p>
        </div>

        <Link
          href="/dashboard/customer/orders"
          className="text-sm font-semibold text-[#B08D57] transition-colors hover:text-[#25221F]"
        >
          View All Orders →
        </Link>
      </div>

      {/* Orders */}
      <div className="divide-y divide-[#E8E1D6]">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#FDFBF7] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.product}
                className="h-16 w-16 rounded-xl border border-[#E8E1D6] bg-[#F8F5EF] object-cover"
              />

              <div>
                <h3 className="font-medium text-[#25221F]">{order.product}</h3>
                <p className="mt-1 text-xs text-[#77716A]">Order #{order.id}</p>
                <p className="mt-1 text-xs text-[#99918A]">{order.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <p className="font-semibold text-[#25221F]">
                ৳{order.amount.toLocaleString("en-BD")}
              </p>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  statusStyles[order.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* {TODO:Empty state can be added when connecting the API */}
    </div>
  );
}

export default UserRecentOrders;
