import { redirect } from 'next/navigation';

export default function RootPage() {
  // 默认重定向到登录页面
  redirect('/login');
  // 或者，如果需要根据登录状态判断，可以在这里添加逻辑
  // const isLoggedIn = false; // 假设的登录状态
  // if (!isLoggedIn) {
  //   redirect('/login');
  // } else {
  //   redirect('/dashboard');
  // }

  // return null; // 重定向后不需要渲染任何内容
}
