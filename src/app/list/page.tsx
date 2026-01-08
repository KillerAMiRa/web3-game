// app/page.tsx
import UserCard from '@/components/UserCard';

// 定义类型
interface User {
  id: string;
  name: string;
  avatar: string;
}

// Server Components：服务端执行，无客户端 JS
export default async function Home() {
  // fetch 默认缓存，next: { revalidate: 60 } 配置重验证
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 60 }, // 60秒重验证一次
  });
  const users: User[] = await res.json();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">用户列表（SSR）</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}