
"use client";

import { authClient, useSession } from "@/lib/auth-client";
import {
  LayoutSideContent,
  House,
  ShoppingBag,
  Users,
  Tags,
  ChartColumn,
  Store,
  ArrowRightFromSquare,
  BriefcaseFill,
  Gear,
  ShoppingCart,
  Persons,
} from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();

  const adminNav = [
    {
      icon: House,
      href: "/dashboard/admin",
      label: "Overview",
    },
    {
      icon: BriefcaseFill,
      href: "/dashboard/admin/products",
      label: "Products",
    },
    {
      icon: Tags,
      href: "/dashboard/admin/categories",
      label: "Categories",
    },
    {
      icon: ShoppingBag,
      href: "/dashboard/admin/orders",
      label: "Orders",
    },
    {
      icon: Persons,
      href: "/dashboard/admin/customers",
      label: "Customers",
    },
    {
      icon: ChartColumn,
      href: "/dashboard/admin/analytics",
      label: "Analytics",
    },
    {
      icon: Gear,
      href: "/dashboard/admin/settings",
      label: "Settings",
    },
  ];

  const navItems = user?.role === "admin" ? adminNav : [];

  const activePath = navItems
    .map((item) => item.href)
    .filter(
      (itemPath) =>
        pathname === itemPath ||
        (itemPath !== "/dashboard/admin" &&
          pathname.startsWith(itemPath + "/"))
    )
    .sort((a, b) => b.length - a.length)[0];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = item.href === activePath;

        return (
          <Link
            href={item.href}
            key={item.href}
            className={`group flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#25221F] text-white shadow-sm"
                : "text-[#77716A] hover:bg-[#F0EBE2] hover:text-[#25221F]"
            }`}
          >
            <item.icon
              className={`size-5 shrink-0 transition-colors ${
                isActive
                  ? "text-[#C9A66B]"
                  : "text-[#A49D93] group-hover:text-[#B08D57]"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const userInfo = (
    <div className="my-5 flex items-center gap-3 border-b border-[#E8E1D6] pb-5">
      <Avatar size="md">
        <Avatar.Image
          src={user?.image || ""}
          alt={user?.name || "Admin"}
        />
        <Avatar.Fallback className="bg-[#EAE1D2] text-[#25221F] font-semibold">
          {user?.name?.slice(0, 2).toUpperCase() || "AD"}
        </Avatar.Fallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-[#25221F]">
          {isPending ? "Loading..." : user?.name || "Admin"}
        </h4>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B08D57]">
          {user?.role || "Admin"}
        </p>
      </div>
    </div>
  );

  const bottomLinks = (
    <div className="flex flex-col gap-1 border-t border-[#E8E1D6] pt-4">
      <button
        type="button"
        onClick={handleSignOut}
        className="flex h-11 items-center gap-3 rounded-lg px-3 text-sm text-red-600 transition-colors hover:bg-red-50"
      >
        <ArrowRightFromSquare className="size-5" />
        Sign Out
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[#E8E1D6] bg-[#FDFBF7] p-5 lg:flex">
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Brand */}
          <Link href="/" className="inline-flex items-center gap-2 py-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#25221F] font-heading text-xl text-[#C9A66B]">
              N
            </span>

            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-wide text-[#25221F]">
                NOORE
              </h2>
              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#B08D57]">
                Perfume House
              </p>
            </div>
          </Link>

          {userInfo}

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A49D93]">
            Management
          </p>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {navContent}
          </div>
        </div>

        {bottomLinks}
      </aside>

      {/* Mobile Sidebar */}
      <Drawer>
        <Button
          isIconOnly
          aria-label="Open dashboard navigation"
          className="fixed right-4 top-4 z-30 bg-[#25221F] text-[#C9A66B] shadow-md lg:hidden"
          variant="secondary"
        >
          <LayoutSideContent className="size-5" />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="bg-[#FDFBF7]">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-full bg-[#25221F] font-heading text-xl text-[#C9A66B]">
                      N
                    </span>

                    <span className="font-heading text-2xl font-semibold tracking-wide text-[#25221F]">
                      NOORE
                    </span>
                  </Link>
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body className="flex flex-col">
                {userInfo}

                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A49D93]">
                  Management
                </p>

                {navContent}

                <div className="mt-auto pt-6">
                  {bottomLinks}
                </div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
