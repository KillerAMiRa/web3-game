// src/lib/news.ts
// 模拟新闻数据
interface News {
  id: string;
  title: string;
  content: string;
  updatedAt: string; // 用于验证数据更新
}

// 模拟获取所有新闻 ID（用于 generateStaticParams）
export async function getAllNewsIds(): Promise<{ id: string }[]> {
  // 模拟异步请求延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

// 模拟根据 ID 获取新闻（核心：每次调用返回最新的 updatedAt）
export async function getNewsById(id: string): Promise<News> {
  // 模拟异步请求延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // 核心：updatedAt 是当前时间，用于验证 ISR 更新
  const now = new Date().toLocaleString();
  
  return {
    id,
    title: `新闻 ${id} - ISR 测试`,
    content: `这是新闻 ${id} 的内容，最后更新时间：${now}`,
    updatedAt: now
  };
}