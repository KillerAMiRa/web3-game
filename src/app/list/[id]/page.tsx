// app/users/[id]/page.tsx
'use client'; // 标记为客户端组件，支持交互
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/types';

export default function UserDetail() {
  const params = useParams(); // 获取动态路由参数
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 客户端请求数据
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://api.example.com/users/${userId}`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, [userId]);
  // ----
  // useEffect(() => {
  //   fetchUser(userId)
  // }, [userId])

  // const fetchUser = async (userId) => {
  //     const res = await fetch(`https://api.example.com/users/${userId}`);
  //     const data = await res.json();
  //     setUser(data);
  //     setLoading(false);
  //   };

  if (loading) return <div className="skeleton h-64 w-full"></div>;
  if (!user) return <div className="text-red-500">用户不存在</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mt-4" />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => alert(`查看用户 ${user.name} 详情`)}
      >
        交互按钮
      </button>
    </div>
  );
}