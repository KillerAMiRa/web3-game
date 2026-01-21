// components/IpfsViewer.jsx
import React, { useState, useEffect } from 'react';
import { useIpfs } from '../contexts/IpfsContext';

const IpfsViewer = ({ initialCid = '' }) => {
  const { gateway } = useIpfs();
  const [cid, setCid] = useState(initialCid);
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContent = async (contentCid) => {
    if (!contentCid) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${gateway}${contentCid}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      setContentType(contentType);

      if (contentType.startsWith('image/')) {
        // 图片内容
        setContent(`${gateway}${contentCid}`);
      } else if (contentType.startsWith('text/') || contentType.includes('json')) {
        // 文本或JSON
        const text = await response.text();
        setContent(text);
      } else {
        // 二进制文件
        setContent(`文件类型: ${contentType}`);
      }
    } catch (err) {
      console.error('获取内容失败:', err);
      setError(`获取失败: ${err.message}`);
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCid) {
      fetchContent(initialCid);
    }
  }, [initialCid, gateway]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchContent(cid);
  };

  const renderContent = () => {
    if (loading) return <div className="loading">加载中...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!content) return <div className="placeholder">输入 CID 查看内容</div>;

    if (contentType.startsWith('image/')) {
      return (
        <img
          src={content}
          alt="IPFS 内容"
          style={{ maxWidth: '100%', maxHeight: '500px' }}
        />
      );
    } else if (contentType.includes('json')) {
      try {
        const parsed = JSON.parse(content);
        return (
          <pre style={{ textAlign: 'left', overflow: 'auto' }}>
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      } catch {
        return <pre>{content}</pre>;
      }
    } else {
      return <pre style={{ textAlign: 'left' }}>{content}</pre>;
    }
  };

  return (
    <div className="ipfs-viewer">
      <form onSubmit={handleSubmit} className="cid-form">
        <input
          type="text"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          placeholder="输入 IPFS CID (如: QmXyz...)"
          className="cid-input"
        />
        <button
          type="submit"
          disabled={!cid || loading}
          className="fetch-button"
        >
          {loading ? '加载中...' : '获取内容'}
        </button>
      </form>

      <div className="content-display">
        {renderContent()}
      </div>

      {contentType && (
        <div className="content-meta">
          <small>类型: {contentType}</small>
        </div>
      )}
    </div>
  );
};

export default IpfsViewer;