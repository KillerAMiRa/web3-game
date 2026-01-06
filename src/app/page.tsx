'use client'

import { useConnect, useConnection, useConnectors, useDisconnect } from 'wagmi'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import Head from 'next/head';
import Index from "./news/[id]/index";
import TodoList from './todo';

function App() {
  let ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
  let suits = ['♥️', '♦️', '♣️', '♠️']
  let init = ranks.map((rank) => suits.map((suit) => ({ rank, suit }))).flat()
  // console.log('🚀 - init:', init)

  let [deck, setDeck] = useState<any>([])
  useEffect(() => {
    setDeck(init)
  }, [])

  const connection = useConnection()
  const { connect, status, error } = useConnect()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect()

  return (
    <>
      <Index />
      {/* <Head>
        <title>TODO List with Next.js and Zustand</title>
        <meta name="description" content="A simple TODO list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <ConnectButton />
      <main>
        <TodoList />
      </main>
      <div className="p-2">
        <div className="flex flex-wrap">
          {deck.slice(0, 3).map((card: any, index: any) => (
            <div key={index} className="w-12 h-20 border m-2 p-1">
              <div className="">{card.rank} </div>
              <div className="text-center">{card.suit} </div>
              <div className="text-right">{card.rank} </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2">2</div>
      <div>
        <Button type="primary">Button</Button>
        <Button type="primary">Button</Button>
        <Button type="primary">Button</Button>
      </div>
      <hr />
      <div className="p-2">
        <h2>Connection</h2>

        <div>
          status: {connection.status}
          <br />
          addresses: {JSON.stringify(connection.addresses)}
          <br />
          chainId: {connection.chainId}
        </div>

        {connection.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
