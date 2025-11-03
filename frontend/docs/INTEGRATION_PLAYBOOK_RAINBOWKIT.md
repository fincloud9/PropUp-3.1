# RainbowKit Multi-Wallet Integration Playbook for PropUp

## Overview

This playbook provides complete instructions for implementing RainbowKit with multi-wallet support (MetaMask, WalletConnect, Coinbase Wallet) in PropUp's React application connected to Polygon blockchain.

## Prerequisites

- Node.js 16.0+
- React 18+
- Yarn or npm package manager
- WalletConnect Project ID from https://cloud.reown.com
- Alchemy/Infura API key for Polygon RPC

## Installation

```bash
yarn add @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

## Configuration

### 1. Environment Variables

Create `.env.local`:

```env
REACT_APP_WALLET_CONNECT_PROJECT_ID=your_project_id
REACT_APP_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
REACT_APP_POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
```

### 2. Wagmi Configuration

Create `src/config/wagmi.ts`:

```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon, polygonAmoy } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PropUp',
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID!,
  chains: [polygon, polygonAmoy],
  ssr: false,
});
```

### 3. Provider Setup

Create `src/providers/Web3Provider.tsx`:

```typescript
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../config/wagmi';

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Wallet Connection

### Connect Button Component

```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletConnect() {
  return <ConnectButton />;
}
```

### Custom Connect Button

```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={openChainModal} type="button">
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
```

## Smart Contract Interaction

### Reading Contract Data

```typescript
import { useReadContract } from 'wagmi';
import { PROPERTY_NFT_ABI } from '../config/abis';

export function PropertyOwner({ tokenId }: { tokenId: bigint }) {
  const { data: owner } = useReadContract({
    address: process.env.REACT_APP_PROPERTY_NFT_CONTRACT as `0x${string}`,
    abi: PROPERTY_NFT_ABI,
    functionName: 'ownerOf',
    args: [tokenId],
  });

  return <div>Owner: {owner}</div>;
}
```

### Writing to Contracts

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

export function BuyProperty({ listingId, price }: { listingId: bigint; price: string }) {
  const { data: hash, writeContract, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleBuy = () => {
    writeContract({
      address: process.env.REACT_APP_MARKETPLACE_CONTRACT as `0x${string}`,
      abi: MARKETPLACE_ABI,
      functionName: 'buyProperty',
      args: [listingId],
      value: parseEther(price),
    });
  };

  return (
    <button onClick={handleBuy} disabled={isPending || isConfirming}>
      {isPending ? 'Confirm in wallet...' : isConfirming ? 'Processing...' : 'Buy Property'}
    </button>
  );
}
```

### Event Listening

```typescript
import { useWatchContractEvent } from 'wagmi';

export function PropertyTransferListener() {
  useWatchContractEvent({
    address: process.env.REACT_APP_PROPERTY_NFT_CONTRACT as `0x${string}`,
    abi: PROPERTY_NFT_ABI,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New transfers:', logs);
      // Handle transfer events
    },
  });

  return null;
}
```

## Network Switching

```typescript
import { useSwitchChain } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';

export function NetworkSwitcher() {
  const { chains, switchChain } = useSwitchChain();

  return (
    <div>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          {chain.name}
        </button>
      ))}
    </div>
  );
}
```

## Account Information

```typescript
import { useAccount, useBalance, useEnsName } from 'wagmi';

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });

  if (!isConnected) return <div>Not connected</div>;

  return (
    <div>
      <p>Address: {ensName || address}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
    </div>
  );
}
```

## Best Practices

1. **Always use environment variables** for contract addresses and API keys
2. **Handle loading and error states** in all contract interactions
3. **Implement transaction confirmation** with `useWaitForTransactionReceipt`
4. **Use simulation** with `useSimulateContract` before writing to contracts
5. **Implement proper error handling** for wallet rejections and network issues
6. **Cache contract reads** using TanStack Query's caching
7. **Monitor gas prices** and warn users of high fees
8. **Test on testnets** (Polygon Amoy) before mainnet deployment

## Troubleshooting

### Issue: WalletConnect not working
**Solution:** Verify your Project ID is correct at https://cloud.reown.com

### Issue: RPC rate limiting
**Solution:** Use Alchemy or Infura instead of public RPCs

### Issue: Wrong network
**Solution:** Implement network switching with `useSwitchChain`

### Issue: Transaction failures
**Solution:** Use `useSimulateContract` to catch errors before signing

## Additional Resources

- RainbowKit Docs: https://rainbowkit.com
- Wagmi Docs: https://wagmi.sh
- Viem Docs: https://viem.sh
- Polygon Docs: https://docs.polygon.technology
