import { useState } from 'react';
import { useEstimateGas, useFeeData } from 'wagmi';
import { parseGwei, formatEther, formatGwei } from 'viem';
import { useWallet } from '@/hooks/useWallet'; // 之前设计的钱包Hook

// DEX Swap 交易的 Gas 费计算组件
export function GasFeeCalculator() {
  const { address, chain } = useWallet(); // 获取当前钱包地址、链信息
  const [txData, setTxData] = useState<{ to: `0x${string}`; data: `0x${string}` } | null>(null);

  // 1. 获取链上 Gas Price 建议值（slow/standard/fast 对应不同优先级）
  const { data: feeData } = useFeeData({
    chainId: chain?.id, // 当前链ID（如以太坊主网 1，BSC 56）
  });

  // 2. 估算交易所需的 Gas Limit（核心：传入交易的 to/value/data）
  const { data: estimatedGas, isLoading: gasEstimateLoading } = useEstimateGas({
    address, // 发起交易的钱包地址
    to: txData?.to, // DEX 合约地址（如 Uniswap V2 Router：0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D）
    data: txData?.data, // 交易的 calldata（Swap 方法的编码数据）
    value: parseGwei('0'), // 交易附带的 ETH 数量（Swap 稳定币时为 0）
    query: {
      enabled: !!txData, // 只有 txData 存在时才估算
    },
  });

  // 3. 计算不同优先级的总 Gas 费
  const calculateTotalFee = (gasPrice: bigint | undefined) => {
    if (!gasPrice || !estimatedGas) return '0';
    // 总费用 = Gas Limit × Gas Price → 转换为 ETH 展示
    const totalWei = estimatedGas * gasPrice;
    return formatEther(totalWei); // 格式化为 ETH 字符串（如 0.0005 ETH）
  };

  // 模拟：生成 Swap 交易的 calldata（实际开发中从合约编码获取）
  const generateSwapTxData = () => {
    // 替换为真实的 DEX 合约地址和 Swap calldata
    setTxData({
      to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      data: '0x7ff36ab5000000000000000000000000...', // 编码后的 Swap 数据
    });
  };

  if (gasEstimateLoading) return <div>估算 Gas 费中...</div>;

  return (
    <div className="gas-fee-calculator">
      <button onClick={generateSwapTxData} disabled={!address}>
        估算 Swap 交易 Gas 费
      </button>

      {txData && (
        <div className="gas-fee-info">
          <h4>Gas 费估算（{chain?.name}）</h4>
          <div className="gas-price">
            <p>当前 Gas Price 建议：</p>
            <ul>
              <li>慢速（30分钟）：{feeData?.slow.gasPrice ? formatGwei(feeData.slow.gasPrice) : 0} Gwei</li>
              <li>标准（5分钟）：{feeData?.standard.gasPrice ? formatGwei(feeData.standard.gasPrice) : 0} Gwei</li>
              <li>快速（1分钟）：{feeData?.fast.gasPrice ? formatGwei(feeData.fast.gasPrice) : 0} Gwei</li>
            </ul>
          </div>

          <div className="gas-limit">
            <p>预估 Gas Limit：{estimatedGas ? estimatedGas.toString() : 0}</p>
          </div>

          <div className="total-fee">
            <p>总 Gas 费（标准）：{calculateTotalFee(feeData?.standard.gasPrice)} ETH</p>
            <p>总 Gas 费（快速）：{calculateTotalFee(feeData?.fast.gasPrice)} ETH</p>
          </div>

          {/* 可选：允许用户手动调整 Gas Price（专业模式） */}
          <div className="custom-gas">
            <label>自定义 Gas Price（Gwei）：</label>
            <input
              type="number"
              placeholder="输入数值"
              onChange={(e) => {
                const customGasPrice = e.target.value ? parseGwei(e.target.value) : undefined;
                console.log('自定义总费用：', calculateTotalFee(customGasPrice));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// 检查钱包余额是否足够支付 Gas 费 + 交易金额
const checkBalanceEnough = (balance: bigint, totalFee: bigint, txValue: bigint) => {
  const totalCost = txValue + totalFee; // 交易金额 + Gas 费
  if (balance < totalCost) {
    return { enough: false, message: '钱包余额不足，无法支付交易金额 + Gas 费' };
  }
  return { enough: true };
};
