import { useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useWallet } from '@/hooks/useWallet';

// 配置支持的链（ID + 名称 + 合约地址 + 原生代币）
export const SUPPORTED_CHAINS = [
  {
    id: 1, // 以太坊主网
    name: 'Ethereum',
    rpc: 'https://mainnet.infura.io/v3/YOUR_API_KEY',
    nativeToken: 'ETH',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap V2 Router
  },
  {
    id: 56, // BSC 主网
    name: 'BSC',
    rpc: 'https://bsc-dataseed1.binance.org/',
    nativeToken: 'BNB',
    routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E', // PancakeSwap Router
  },
  {
    id: 42161, // Arbitrum 主网
    name: 'Arbitrum',
    rpc: 'https://arb1.arbitrum.io/rpc',
    nativeToken: 'ETH',
    routerAddress: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', // Uniswap V3 Router
  },
];

// 多链切换组件
export function ChainSwitcher() {
  const { isConnected } = useWallet();
  const { chain } = useNetwork(); // 当前链信息
  const { switchNetwork, isLoading, error } = useSwitchNetwork(); // 切换链 Hook

  // 切换链的处理函数
  const handleSwitchChain = async (chainId: number) => {
    if (!isConnected) {
      alert('请先连接钱包');
      return;
    }
    try {
      await switchNetwork(chainId);
    } catch (err) {
      console.error('切换链失败：', err);
      alert('切换链失败，请手动在钱包中添加该链后重试');
    }
  };

  return (
    <div className="chain-switcher">
      <p>当前链：{chain?.name || '未连接'}</p>

      <div className="chain-list">
        {SUPPORTED_CHAINS.map((supportedChain) => (
          <button
            key={supportedChain.id}
            onClick={() => handleSwitchChain(supportedChain.id)}
            disabled={isLoading || (chain?.id === supportedChain.id)}
            className={chain?.id === supportedChain.id ? 'active' : ''}
          >
            {supportedChain.name}
          </button>
        ))}
      </div>

      {/* 错误提示 */}
      {error && <p className="error">切换失败：{error.message}</p>}
    </div>
  );
}