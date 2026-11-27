import UserDashboardStats from "@/components/dashboard/dashboardUser/UserDashboardStats";
import UserRecentOrders from "@/components/dashboard/dashboardUser/UserRecentOrders";

export default function UserDashboard() {
  return (
    <div className="my-4 mx-auto w-[calc(100%_-_2rem)] space-y-4">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-[#25221F]">
          My Dashboard
        </h1>
        <p className="mt-2 text-sm text-[#77716A]">
          Welcome back! Here&apos;s an overview of your account.
        </p>
      </div>

      <UserDashboardStats />
      <UserRecentOrders />
    </div>
  );
}
