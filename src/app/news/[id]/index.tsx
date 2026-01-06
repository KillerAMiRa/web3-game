// src/app/page.tsx
export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Next.js ISR 演示</h1>
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <a href="/news/1" style={{ color: '#0070f3', fontSize: '1.2rem' }}>
          查看新闻 1（ISR 测试）
        </a>
        <a href="/news/2" style={{ color: '#0070f3', fontSize: '1.2rem' }}>
          查看新闻 2（ISR 测试）
        </a>
        <a href="/news/3" style={{ color: '#0070f3', fontSize: '1.2rem' }}>
          查看新闻 3（ISR 测试）
        </a>
      </div>
    </main>
  );
}