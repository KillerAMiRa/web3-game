import * as React from 'react'
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'
import { Button } from 'antd'

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction
  } = useSendTransaction()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <form onSubmit={submit} className='p-2 bg-pink-200'>
      <input name="address" placeholder="0xA0Cf…251e" className='mr-2' required />
      <input name="value" placeholder="0.05" className='mr-2' required />
      <button
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  )
}
