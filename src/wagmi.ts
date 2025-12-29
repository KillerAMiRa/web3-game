import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export function getConfig() {
  return createConfig({
    // 支持的区块链网络
    chains: [mainnet, sepolia],
    // 使用cookie作为存储方案
    storage: createStorage({
      storage: cookieStorage,
    }),
    // 启用服务端渲染支持
    ssr: true,
    // 为每个网络配置HTTP传输层
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
