import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect, connectors, error, isLoading } = useConnect({
    connectors: [injected(), walletConnect()],
  });
  const { disconnect } = useDisconnect();

  // 切换网络（示例：切换到BSC主网）
  const switchNetwork = async (chainId: number) => {
    if (!window.ethereum) throw new Error('钱包未安装');
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (err: any) {
      // 若网络未添加，请求添加
      if (err.code === 4902) {
        // 这里可配置各链的参数（如BSC：{ chainId: '0x38', chainName: 'BSC Mainnet', ... }）
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      }
    }
  };

  return {
    address, // 钱包地址
    isConnected, // 是否连接
    chain, // 当前链信息
    connect, // 连接钱包
    disconnect, // 断开钱包
    switchNetwork, // 切换网络
    connectors, // 可用钱包列表
    error, // 连接错误
    isLoading, // 加载状态
  };
}