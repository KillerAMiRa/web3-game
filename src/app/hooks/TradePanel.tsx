import { useState } from 'react';
import { useBalance } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { useTrade } from '@/hooks/useTrade';

// 交易面板组件
export function TradePanel() {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy'); // 买/卖
  const [orderType, setOrderType] = useState<'limit' | 'market'>('market'); // 限价/市价
  const [amount, setAmount] = useState(''); // 交易金额
  const [price, setPrice] = useState(''); // 限价价格

  // 当前交易对（示例：ETH/USDC）
  const currentPair = { base: 'ETH', quote: 'USDC', decimals: 18 };
  // 获取钱包余额
  const { data: balance } = useBalance({
    address: address, // 从useWallet获取
    token: currentPair.base === 'ETH' ? undefined : 'ETH合约地址', // 代币合约地址
  });

  // 交易逻辑Hook（封装下单、计算滑点等）
  const { submitOrder, isLoading, slippage, fee } = useTrade({
    tradeType,
    orderType,
    amount,
    price,
    pair: currentPair,
  });

  // 快速填充金额（如50%）
  const fillAmount = (percent: number) => {
    if (!balance) return;
    const balanceNum = Number(formatUnits(balance.value, currentPair.decimals));
    setAmount((balanceNum * percent / 100).toFixed(4));
  };

  return (
    <div className="trade-panel">
      {/* 买/卖切换 */}
      <div className="trade-type">
        <button
          className={tradeType === 'buy' ? 'active' : ''}
          onClick={() => setTradeType('buy')}
        >
          买入
        </button>
        <button
          className={tradeType === 'sell' ? 'active' : ''}
          onClick={() => setTradeType('sell')}
        >
          卖出
        </button>
      </div>

      {/* 限价/市价切换 */}
      <div className="order-type">
        <button
          className={orderType === 'limit' ? 'active' : ''}
          onClick={() => setOrderType('limit')}
        >
          限价
        </button>
        <button
          className={orderType === 'market' ? 'active' : ''}
          onClick={() => setOrderType('market')}
        >
          市价
        </button>
      </div>

      {/* 金额输入 */}
      <div className="amount-input">
        <label>{tradeType === 'buy' ? '买入数量' : '卖出数量'} ({currentPair.base})</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="输入数量"
        />
        <div className="quick-fill">
          <button onClick={() => fillAmount(25)}>25%</button>
          <button onClick={() => fillAmount(50)}>50%</button>
          <button onClick={() => fillAmount(100)}>100%</button>
        </div>
        <p>可用余额：{balance ? formatUnits(balance.value, currentPair.decimals) : 0} {currentPair.base}</p>
      </div>

      {/* 限价价格（市价时隐藏） */}
      {orderType === 'limit' && (
        <div className="price-input">
          <label>价格 ({currentPair.quote})</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="输入价格"
          />
        </div>
      )}

      {/* 交易信息提示 */}
      <div className="trade-info">
        <p>滑点 ：{slippage}%</p>
        <p>手续费：{fee} {currentPair.quote}</p>
        <p>预计成交：{amount && price ? (Number(amount) * Number(price)).toFixed(4) : 0} {currentPair.quote}</p>
      </div>

      {/* 下单按钮 */}
      <button
        className="submit-order"
        onClick={submitOrder}
        disabled={isLoading || !amount || (orderType === 'limit' && !price)}
      >
        {isLoading ? '处理中...' : tradeType === 'buy' ? '买入' : '卖出'}
      </button>
    </div>
  );
}