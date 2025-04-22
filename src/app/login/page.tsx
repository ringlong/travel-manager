import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">登录</h2>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="请输入邮箱" required />
          </div>
          <div>
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" placeholder="请输入密码" required />
          </div>
          <Button type="submit" className="w-full">
            登录
          </Button>
          {/* 暂时用 Link 跳转，后续会替换为实际登录逻辑 */}
          <div className="text-center">
            <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
              （临时入口）进入 Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}