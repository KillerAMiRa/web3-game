import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
// 引入 Stargate SDK（需先安装：npm install @stargatefinance/stg-sdk）
import { StargateSDK } from '@stargatefinance/stg-sdk';

export function CrossChainBridge() {
  const { address } = useAccount();
  const [fromChainId, setFromChainId] = useState(1); // 源链（以太坊）
  const [toChainId, setToChainId] = useState(42161); // 目标链（Arbitrum）
  const [token, setToken] = useState('USDC'); // 跨链代币
  const [amount, setAmount] = useState(''); // 跨链金额

  // 获取源链代币余额
  const { data: balance } = useBalance({
    address,
    chainId: fromChainId,
    token: token === 'USDC' ? '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' : undefined, // USDC 合约地址
  });

  // 初始化 Stargate SDK
  const initStargate = async () => {
    const stgSdk = new StargateSDK({
      apiKey: 'YOUR_STARGATE_API_KEY', // 从 Stargate 官网获取
      chains: [fromChainId, toChainId],
    });
    return stgSdk;
  };

  // 发起跨链转账
  const handleCrossChainTransfer = async () => {
    if (!address || !amount) return;
    try {
      const stgSdk = await initStargate();
      // 获取跨链路由
      const route = await stgSdk.getRoute({
        fromChainId,
        toChainId,
        token,
        amount: parseUnits(amount, 6), // USDC 是 6 位小数
        recipient: address, // 接收地址（同钱包地址）
      });

      // 发起跨链交易
      const tx = await route.execute();
      await tx.wait();
      alert('跨链转账已发起，可在钱包中查看进度');
    } catch (err) {
      console.error('跨链失败：', err);
      alert('跨链转账失败，请重试');
    }
  };

  return (
    <div className="cross-chain-bridge">
      <h3>跨链资产桥接</h3>

      {/* 源链/目标链选择 */}
      <div className="chain-select">
        <select value={fromChainId} onChange={(e) => setFromChainId(Number(e.target.value))}>
          <option value={1}>以太坊</option>
          <option value={56}>BSC</option>
          <option value={42161}>Arbitrum</option>
        </select>
        <span>→</span>
        <select value={toChainId} onChange={(e) => setToChainId(Number(e.target.value))}>
          <option value={1}>以太坊</option>
          <option value={56}>BSC</option>
          <option value={42161}>Arbitrum</option>
        </select>
      </div>

      {/* 代币/金额输入 */}
      <div className="token-amount">
        <select value={token} onChange={(e) => setToken(e.target.value)}>
          <option value="USDC">USDC</option>
          <option value="ETH">ETH</option>
          <option value="BNB">BNB</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="输入转账金额"
        />
        <p>可用余额：{balance ? formatUnits(balance.value, 6) : 0} {token}</p>
      </div>

      {/* 发起跨链 */}
      <button onClick={handleCrossChainTransfer} disabled={!amount || !address}>
        发起跨链转账
      </button>
    </div>
  );
}