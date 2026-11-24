
"use client";

import React from "react";
import {
  Wallet,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "৳ 0",
    change: "+0%",
    description: "Compared to last month",
    icon: Wallet,
  },
  {
    title: "Total Orders",
    value: "0",
    change: "+0%",
    description: "Compared to last month",
    icon: ShoppingBag,
  },
  {
    title: "Total Products",
    value: "0",
    change: "+0%",
    description: "Currently in your store",
    icon: Package,
  },
  {
    title: "Total Customers",
    value: "0",
    change: "+0%",
    description: "Registered customers",
    icon: Users,
  },
];

function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-[#E8E1D6] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D57]/50 hover:shadow-lg hover:shadow-[#25221F]/5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#77716A]">
                  {stat.title}
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#25221F]">
                  {stat.value}
                </h3>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#B08D57] transition-colors group-hover:bg-[#25221F] group-hover:text-[#C9A66B]">
                <Icon size={21} strokeWidth={1.7} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF6EE] px-2.5 py-1 text-xs font-semibold text-[#39834A]">
                <TrendingUp size={13} />
                {stat.change}
              </span>

              <span className="text-xs text-[#A49D93]">
                {stat.description}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default DashboardStats;
