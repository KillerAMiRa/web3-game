// src/app/news/[id]/page.tsx
import { getAllNewsIds, getNewsById } from '@/lib/news';
import { Button } from "@/components/ui/button"
import Image from 'next/image'
// import { useImmer } from 'use-immer';

// 🔴 ISR 核心配置：30 秒重新验证一次
export const revalidate = 30;

// 🔴 构建时预生成静态页面的参数（SSG 基础）
export async function generateStaticParams() {
  const newsIds = await getAllNewsIds();
  return newsIds;
}

// 页面组件（React Server Component，运行在服务端）
export default async function NewsPage({ params }: { params: { id: string } }) {
  const p = await params
  // console.log('🚀 - params:', p)
  // 🔴 每次重新验证时，会重新执行这个请求获取最新数据
  const news = await getNewsById(p?.id);

  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{news.title}</h1>
      <div style={{ color: '#666', marginBottom: '2rem' }}>
        最后更新：<strong>{news.updatedAt}</strong>
      </div>
      <div style={{ lineHeight: '1.6' }}>{news.content}</div>

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        <p style={{ color: '#999' }}>ISR 配置：每 30 秒自动更新数据</p>
      </div>
      <Button>Click me</Button>
      {/* <Image src="/1.jpg" alt="Picture of the author" width={100} height={100} /> */}
      <Image src="https://eo-img.521799.xyz/i/pc/img1.webp" alt="Picture of the author" width={100} height={100} />
    </main>
  );
}