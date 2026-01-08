import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
// import { config } from './config'
import { getConfig} from '@/wagmi'
import { SendTransaction } from '../send-transaction'

const queryClient = new QueryClient()
const config = getConfig()

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SendTransaction />
      </QueryClientProvider>
    </WagmiProvider>
  )
}