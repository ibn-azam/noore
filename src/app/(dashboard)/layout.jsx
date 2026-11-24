import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar/>
      <div>{children}</div>
    </div>
  );
}

export default DashboardLayout;
