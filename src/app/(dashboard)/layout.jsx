import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#000c16]">
      <DashboardSidebar/>
      <div>{children}</div>
    </div>
  );
}

export default DashboardLayout;
