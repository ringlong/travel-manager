'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Users, MapPin, Settings, ListFilter } from 'lucide-react'; // Import icons

const navItems = [
  { href: '/dashboard', label: '仪表盘', icon: Home },
  { href: '/dashboard/accounts', label: '账户管理', icon: Users },
  { href: '/dashboard/scenic-spots', label: '景区管理', icon: MapPin },
  { href: '/dashboard/content-manage', label: '内容管理', icon: ListFilter },
  { href: '/dashboard/settings', label: '设置', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-200 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">后台管理</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link href={item.href} key={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'font-semibold'
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      {/* Optional: Add user profile/logout section at the bottom */}
      {/* <div className="mt-auto">...</div> */}
    </aside>
  );
}