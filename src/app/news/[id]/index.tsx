// src/app/page.tsx
export default function Home() {
  return (
    <main style={{ margin: 'auto', padding: '0 1rem' }}>
      <h1>Next.js ISR 演示</h1>
      <div>
        <a href="/news/1">
          查看新闻 1（ISR 测试）
        </a>
        <a href="/news/2">
          查看新闻 2（ISR 测试）
        </a>
        <a href="/news/3">
          查看新闻 3（ISR 测试）
        </a>
      </div>
    </main>
  );
}