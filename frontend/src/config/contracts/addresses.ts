// Smart Contract Addresses - PropUp v3.5.0 (Property-as-a-Service Model)
// Update these addresses after deploying contracts via Toolblox

export const CONTRACT_ADDRESSES = {
  // =========================================================================
  // MODULE M1: Property Listing & Staking
  // =========================================================================
  PROPERTY_REGISTRY: process.env.REACT_APP_PROPERTY_REGISTRY_CONTRACT || '0x0000000000000000000000000000000000000000',
  PROPERTY_STAKING: process.env.REACT_APP_PROPERTY_STAKING_CONTRACT || '0x0000000000000000000000000000000000000000',
  ACCESS_RIGHTS_NFT: process.env.REACT_APP_ACCESS_RIGHTS_NFT_CONTRACT || '0x0000000000000000000000000000000000000000',
  
  // =========================================================================
  // MODULE M2: Yield Distribution & Escrow
  // =========================================================================
  YIELD_DISTRIBUTOR: process.env.REACT_APP_YIELD_DISTRIBUTOR_CONTRACT || '0x0000000000000000000000000000000000000000',
  ESCROW_MANAGER: process.env.REACT_APP_ESCROW_MANAGER_CONTRACT || '0x0000000000000000000000000000000000000000',
  DISPUTE_RESOLVER: process.env.REACT_APP_DISPUTE_RESOLVER_CONTRACT || '0x0000000000000000000000000000000000000000',
  
  // =========================================================================
  // MODULE M3: Governance & Staker Rights
  // =========================================================================
  GOVERNANCE_TOKEN: process.env.REACT_APP_GOVERNANCE_TOKEN_CONTRACT || '0x0000000000000000000000000000000000000000',
  PROPOSAL_MANAGER: process.env.REACT_APP_PROPOSAL_MANAGER_CONTRACT || '0x0000000000000000000000000000000000000000',
  VOTING_MECHANISM: process.env.REACT_APP_VOTING_MECHANISM_CONTRACT || '0x0000000000000000000000000000000000000000',
  
  // =========================================================================
  // MODULE M4: Fractional Ownership & Trading
  // =========================================================================
  PROPERTY_TOKEN: process.env.REACT_APP_PROPERTY_TOKEN_CONTRACT || '0x0000000000000000000000000000000000000000',
  LIQUIDITY_POOL: process.env.REACT_APP_LIQUIDITY_POOL_CONTRACT || '0x0000000000000000000000000000000000000000',
  TRADING_ENGINE: process.env.REACT_APP_TRADING_ENGINE_CONTRACT || '0x0000000000000000000000000000000000000000',
  
  // =========================================================================
  // MODULE M6: White-Label Configuration
  // =========================================================================
  AGENCY_REGISTRY: process.env.REACT_APP_AGENCY_REGISTRY_CONTRACT || '0x0000000000000000000000000000000000000000',
  BRANDING_CONFIG: process.env.REACT_APP_BRANDING_CONFIG_CONTRACT || '0x0000000000000000000000000000000000000000',
} as const;

// Network configurations
export const SUPPORTED_CHAINS = {
  POLYGON_MAINNET: 137,
  POLYGON_AMOY: 80002,
} as const;

export const RPC_URLS = {
  [SUPPORTED_CHAINS.POLYGON_MAINNET]: process.env.REACT_APP_POLYGON_MAINNET_RPC || 'https://polygon-rpc.com',
  [SUPPORTED_CHAINS.POLYGON_AMOY]: process.env.REACT_APP_POLYGON_AMOY_RPC || 'https://rpc-amoy.polygon.technology',
} as const;

// Contract deployment info
export const CONTRACT_DEPLOYMENT_INFO = {
  version: '3.5.0',
  model: 'Property-as-a-Service (PaaS)',
  network: 'Polygon',
  deploymentMethod: 'Toolblox',
  modules: {
    M1: 'Property Listing & Staking',
    M2: 'Yield Distribution & Escrow',
    M3: 'Governance & Staker Rights',
    M4: 'Fractional Ownership & Trading',
    M5: 'AI Assistant & Analytics',
    M6: 'White-Label Configuration',
  },
} as const;
