"use client";

import React from "react";
import { ShoppingBag, Clock, CircleCheck, Wallet } from "@gravity-ui/icons";

const stats = [
  {
    title: "Total Orders",
    value: "12",
    description: "All your purchases",
    icon: ShoppingBag,
  },
  {
    title: "Pending Orders",
    value: "03",
    description: "Waiting for delivery",
    icon: Clock,
  },
  {
    title: "Completed Orders",
    value: "08",
    description: "Successfully delivered",
    icon: CircleCheck,
  },
  {
    title: "Total Spent",
    value: "৳ 24,500",
    description: "Your total purchases",
    icon: Wallet,
  },
];

function UserDashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#E8E1D6] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#77716A]">
                  {stat.title}
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold text-[#25221F]">
                  {stat.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#B08D57]">
                <Icon width={23} height={23} />
              </div>
            </div>

            <p className="mt-4 text-xs text-[#99918A]">{stat.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UserDashboardStats;
