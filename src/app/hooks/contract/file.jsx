// components/IpfsUploader.jsx
import React, { useState, useCallback } from 'react';
import { useIpfs } from '../contexts/IpfsContext';

const IpfsUploader = ({ onUploadComplete }) => {
  const { ipfs, isConnected, gateway } = useIpfs();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState('');
  const [uploadHistory, setUploadHistory] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 文件大小限制 (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('文件大小不能超过 10MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = useCallback(async () => {
    if (!file || !ipfs) return;

    setUploading(true);
    try {
      // 将文件转换为 ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // 上传到 IPFS
      const result = await ipfs.add(buffer, {
        pin: true, // 固定文件
        progress: (prog) => console.log(`上传进度: ${prog}`)
      });

      const fileCid = result.cid.toString();
      setCid(fileCid);

      // 添加到历史记录
      const newRecord = {
        cid: fileCid,
        name: file.name,
        size: file.size,
        type: file.type,
        timestamp: new Date().toISOString(),
        url: `${gateway}${fileCid}`
      };

      setUploadHistory(prev => [newRecord, ...prev.slice(0, 9)]);

      // 回调父组件
      if (onUploadComplete) {
        onUploadComplete(newRecord);
      }

    } catch (error) {
      console.error('上传失败:', error);
      alert(`上传失败: ${error.message}`);
    } finally {
      setUploading(false);
    }
  }, [file, ipfs, gateway, onUploadComplete]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="ipfs-uploader">
      <div
        className={`drop-zone ${!isConnected ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!isConnected ? (
          <div className="connection-error">
            ⚠️ IPFS 连接失败，使用备用模式
          </div>
        ) : (
          <>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              disabled={uploading || !isConnected}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="upload-label">
              {file ? file.name : '点击或拖拽文件到此处'}
            </label>

            {file && (
              <div className="file-info">
                <p>文件名: {file.name}</p>
                <p>大小: {(file.size / 1024).toFixed(2)} KB</p>
                <p>类型: {file.type || '未知'}</p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="upload-button"
            >
              {uploading ? '上传中...' : '上传到 IPFS'}
            </button>
          </>
        )}
      </div>

      {cid && (
        <div className="result-section">
          <h4>✅ 上传成功!</h4>
          <div className="cid-display">
            <span>CID: </span>
            <code className="cid">{cid}</code>
            <button
              onClick={() => navigator.clipboard.writeText(cid)}
              className="copy-button"
            >
              复制
            </button>
          </div>
          <div className="preview">
            {file.type.startsWith('image/') ? (
              <img
                src={`${gateway}${cid}`}
                alt="预览"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            ) : (
              <a
                href={`${gateway}${cid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                查看文件
              </a>
            )}
          </div>
        </div>
      )}

      {uploadHistory.length > 0 && (
        <div className="history-section">
          <h4>上传历史</h4>
          <ul>
            {uploadHistory.map((record, index) => (
              <li key={index} className="history-item">
                <span>{record.name}</span>
                <code className="small-cid">{record.cid.slice(0, 12)}...</code>
                <a
                  href={record.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IpfsUploader;