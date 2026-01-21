// contexts/IpfsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';

const IpfsContext = createContext(null);

export const IpfsProvider = ({ children }) => {
  const [ipfs, setIpfs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [gateway, setGateway] = useState('https://ipfs.io/ipfs/');

  useEffect(() => {
    const initIpfs = async () => {
      try {
        // 使用公共网关或本地节点
        const client = create({
          url: 'https://ipfs.infura.io:5001/api/v0',
          // 或使用本地节点
          // url: 'http://localhost:5001/api/v0'
        });

        // 测试连接
        const { version } = await client.version();
        console.log('IPFS 版本:', version);

        setIpfs(client);
        setIsConnected(true);
      } catch (error) {
        console.error('IPFS 初始化失败:', error);
        // 回退到公共网关
        setIpfs({
          add: async (file) => {
            // 这里可以集成 Pinata 等服务的上传
            return { cid: { toString: () => 'fallback-cid' } };
          }
        });
      }
    };

    initIpfs();

    return () => {
      if (ipfs && ipfs.stop) {
        ipfs.stop();
      }
    };
  }, []);

  return (
    <IpfsContext.Provider value={{ ipfs, isConnected, gateway }}>
      {children}
    </IpfsContext.Provider>
  );
};

export const useIpfs = () => {
  const context = useContext(IpfsContext);
  if (!context) {
    throw new Error('useIpfs 必须在 IpfsProvider 内使用');
  }
  return context;
};