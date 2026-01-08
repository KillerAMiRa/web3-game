import * as React from 'react'
import { useWriteContract } from 'wagmi'
import { abi } from '@/app/abi'

export function MintNFT() {
  const { data: hash, writeContract } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    writeContract({
      address: '0x10177Bb8c9eCD8563A8FBbD761c54f581477f8C1',
      // address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'mint',
      args: [BigInt(tokenId)],
    })
  }

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Mint</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  )
}
