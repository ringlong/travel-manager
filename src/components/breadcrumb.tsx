"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routeNameMap: { [key: string]: string } = {
  dashboard: "仪表盘",
  accounts: "账户管理",
  "scenic-spots": "景区管理",
  "content-manage": "内容管理",
  settings: "设置",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/pages/dashboard"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const name = routeNameMap[segment] || segment;

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {isLast ? (
              <span className="text-foreground font-medium">{name}</span>
            ) : (
              <Link href={path} className="hover:text-foreground">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
