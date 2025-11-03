import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

/**
 * WalletConnect Component
 * 
 * Multi-wallet connection button using RainbowKit
 * Supports: MetaMask, WalletConnect, Coinbase Wallet, Rainbow
 * 
 * Features:
 * - Wallet selection modal
 * - Chain switching
 * - Account display
 * - Disconnect functionality
 */
export function WalletConnect() {
  return (
    <div data-testid="wallet-connect">
      <ConnectButton />
    </div>
  );
}

/**
 * CustomWalletButton Component
 * 
 * Custom styled wallet connection button
 */
export function CustomWalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            data-testid="custom-wallet-button"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    data-testid="connect-wallet-button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    data-testid="wrong-network-button"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex gap-2" data-testid="connected-wallet-display">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    data-testid="chain-selector-button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    data-testid="account-button"
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
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
