import React from 'react';
import { useAccount, useBalance, useEnsName, useEnsAvatar } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

/**
 * AccountInfo Component
 * 
 * Displays connected wallet information:
 * - Wallet address
 * - ENS name (if available)
 * - Balance
 * - Avatar
 */
export function AccountInfo() {
  const { address, isConnected, connector } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  if (!isConnected || !address) {
    return (
      <Card data-testid="account-not-connected">
        <CardHeader>
          <CardTitle>Wallet Not Connected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Please connect your wallet to view account information
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="account-info">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar data-testid="account-avatar">
            <AvatarImage src={ensAvatar || undefined} />
            <AvatarFallback>{address.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {ensName && (
              <div className="font-semibold" data-testid="ens-name">
                {ensName}
              </div>
            )}
            <div className="text-sm text-gray-600 font-mono" data-testid="wallet-address">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          </div>
          <Badge data-testid="wallet-connector">{connector?.name}</Badge>
        </div>

        {balance && (
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600">Balance</div>
            <div className="text-2xl font-bold" data-testid="wallet-balance">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
