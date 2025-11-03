import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../config/contracts/addresses';
import PropertyNFTABI from '../config/contracts/abis/PropertyNFT.json';
import MarketplaceABI from '../config/contracts/abis/Marketplace.json';
import PropertyRegistryABI from '../config/contracts/abis/PropertyRegistry.json';
import ComplianceManagerABI from '../config/contracts/abis/ComplianceManager.json';

/**
 * Custom hook for PropertyNFT contract interactions
 */
export function usePropertyNFT() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const mintProperty = (to, tokenId, metadataURI) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PROPERTY_NFT,
      abi: PropertyNFTABI,
      functionName: 'mint',
      args: [to, tokenId, metadataURI],
    });
  };

  const transferProperty = (from, to, tokenId) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PROPERTY_NFT,
      abi: PropertyNFTABI,
      functionName: 'transferFrom',
      args: [from, to, tokenId],
    });
  };

  return {
    mintProperty,
    transferProperty,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Custom hook to read PropertyNFT data
 */
export function usePropertyNFTRead(tokenId) {
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESSES.PROPERTY_NFT,
    abi: PropertyNFTABI,
    functionName: 'ownerOf',
    args: [tokenId],
  });

  const { data: tokenURI } = useReadContract({
    address: CONTRACT_ADDRESSES.PROPERTY_NFT,
    abi: PropertyNFTABI,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  return { owner, tokenURI };
}

/**
 * Custom hook for Marketplace contract interactions
 */
export function useMarketplace() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createListing = (nftContract, tokenId, price) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MARKETPLACE,
      abi: MarketplaceABI,
      functionName: 'createListing',
      args: [nftContract, tokenId, price],
    });
  };

  const buyProperty = (listingId, value) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MARKETPLACE,
      abi: MarketplaceABI,
      functionName: 'buyProperty',
      args: [listingId],
      value,
    });
  };

  const cancelListing = (listingId) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MARKETPLACE,
      abi: MarketplaceABI,
      functionName: 'cancelListing',
      args: [listingId],
    });
  };

  return {
    createListing,
    buyProperty,
    cancelListing,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Custom hook to read Marketplace listings
 */
export function useMarketplaceListing(listingId) {
  const { data: listing, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.MARKETPLACE,
    abi: MarketplaceABI,
    functionName: 'getListing',
    args: [listingId],
  });

  return { listing, isLoading };
}

/**
 * Custom hook for PropertyRegistry contract interactions
 */
export function usePropertyRegistry() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const registerProperty = (nftContract, tokenId, metadataURI, propertyType) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PROPERTY_REGISTRY,
      abi: PropertyRegistryABI,
      functionName: 'registerProperty',
      args: [nftContract, tokenId, metadataURI, propertyType],
    });
  };

  const updateProperty = (propertyId, metadataURI) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PROPERTY_REGISTRY,
      abi: PropertyRegistryABI,
      functionName: 'updateProperty',
      args: [propertyId, metadataURI],
    });
  };

  return {
    registerProperty,
    updateProperty,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Custom hook for ComplianceManager contract interactions
 */
export function useCompliance() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const verifyKYC = (user, kycHash, level) => {
    writeContract({
      address: CONTRACT_ADDRESSES.COMPLIANCE_MANAGER,
      abi: ComplianceManagerABI,
      functionName: 'verifyKYC',
      args: [user, kycHash, level],
    });
  };

  return {
    verifyKYC,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Custom hook to check compliance status
 */
export function useComplianceCheck(userAddress) {
  const { data: complianceData, isLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.COMPLIANCE_MANAGER,
    abi: ComplianceManagerABI,
    functionName: 'checkCompliance',
    args: [userAddress],
  });

  return {
    isCompliant: complianceData?.[0],
    level: complianceData?.[1],
    isLoading,
  };
}
