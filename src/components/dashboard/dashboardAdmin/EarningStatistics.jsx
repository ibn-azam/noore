
"use client";

import React from "react";

const monthlyRevenue = [
  { month: "Jan", revenue: 35 },
  { month: "Feb", revenue: 48 },
  { month: "Mar", revenue: 40 },
  { month: "Apr", revenue: 65 },
  { month: "May", revenue: 52 },
  { month: "Jun", revenue: 78 },
  { month: "Jul", revenue: 60 },
  { month: "Aug", revenue: 85 },
  { month: "Sep", revenue: 70 },
  { month: "Oct", revenue: 92 },
  { month: "Nov", revenue: 75 },
  { month: "Dec", revenue: 100 },
];

function EarningStatistics() {
  return (
    <div className="rounded-2xl border border-[#E8E1D6] bg-white p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-heading text-xl font-semibold text-[#25221F]">
            Revenue Overview
          </h3>
          <p className="mt-1 text-sm text-[#77716A]">
            Monthly revenue performance throughout the year.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#77716A]">
          <span className="size-2.5 rounded-full bg-[#B08D57]" />
          Revenue
        </div>
      </div>

      <div className="mt-8">
        <div className="flex h-64 items-end justify-between gap-2 border-b border-l border-[#E8E1D6] px-2 sm:gap-4 sm:px-4">
          {monthlyRevenue.map((item) => (
            <div
              key={item.month}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div className="relative flex h-full w-full items-end justify-center">
                <div
                  title={`৳ ${item.revenue * 1000}`}
                  style={{ height: `${item.revenue}%` }}
                  className="w-full max-w-9 rounded-t-lg bg-[#B08D57]/75 transition-all duration-300 group-hover:bg-[#25221F]"
                />
              </div>

              <span className="pb-2 text-[10px] text-[#77716A] sm:text-xs">
                {item.month}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-xs text-[#A49D93]">
          <span>Monthly performance</span>
          <span>Revenue in BDT (৳)</span>
        </div>
      </div>
    </div>
  );
}

export default EarningStatistics;
