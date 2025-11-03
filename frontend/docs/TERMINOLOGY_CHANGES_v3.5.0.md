# PropUp v3.5.0 - Key Terminology Changes

## Overview
PropUp has evolved from v3.1.0 to v3.5.0 with a fundamental shift in business model to **Property-as-a-Service (PaaS) - Staking Model**.

## Major Terminology Changes

### 1. **Property-as-a-Service (PaaS) Model**
- **Old (v3.1.0):** Traditional property buying/selling/renting
- **New (v3.5.0):** Staking-based access rights model
- **Impact:** Users now stake tokens to gain time-bound access to properties instead of purchasing them

### 2. **Access Rights NFTs**
- **Old:** Property ownership NFTs
- **New:** Access Rights NFTs (ERC-721) representing time-bound access
- **Key Features:**
  - `tokenId`: Unique NFT identifier
  - `propertyId`: Property being accessed
  - `startTime` / `endTime`: Access period
  - `isTransferable`: Can be traded on secondary market
  - `isActive`: Current validity status

### 3. **Staking Mechanisms**
- **Old:** Direct property purchase
- **New:** Token staking for access rights
- **Components:**
  - **Staking Rate:** Minimum tokens required
  - **Stake Period:** Min/Max duration limits
  - **Yield Rate:** Return percentage for property owners
  - **Staking Multiplier:** Bonus based on duration (max 2x)

### 4. **Yield Distribution**
- **Old:** Rental income
- **New:** Automated yield from stakers to property owners
- **Process:**
  - Stakers lock tokens
  - Property owners earn yield based on stake amount and duration
  - Platform deducts fees (platform: 2.5%, agency: 1.5%)
  - Automated via Chainlink Keeper

### 5. **Governance Token**
- **New Feature in v3.5.0**
- **Type:** ERC-20 token with voting capabilities
- **Issuance:** Minted when staking, burned when unstaking
- **Voting Power Formula:**
  ```
  Multiplier = 1 + (stakeDuration / 365 days) * 0.5
  Max Multiplier = 2x
  ```
- **Features:**
  - Delegation support
  - Quadratic voting (optional)
  - Historical vote tracking

### 6. **Escrow Management**
- **New Feature in v3.5.0**
- **Purpose:** Secure custody of staked tokens
- **States:** Active, Released, Refunded, Disputed, Frozen
- **Release Conditions:**
  - Stake period completion
  - No active disputes

### 7. **Dispute Resolution**
- **New Feature in v3.5.0**
- **Process:**
  1. Party raises dispute
  2. Escrow frozen
  3. Evidence submission
  4. Arbitrator review
  5. Decision execution
  6. Appeal option available
- **Decisions:** FullRefund, PartialRefund, FullRelease, NoAction

### 8. **Property Tokens (Fractional Ownership)**
- **Old:** Single NFT per property
- **New:** ERC-1155 tokens for fractional ownership
- **Trading:** AMM liquidity pools + order book engine
- **Benefits:** Lower entry barrier, enhanced liquidity

### 9. **White-Label Portals**
- **New Feature in v3.5.0**
- Property agencies can deploy branded versions
- Customizable themes and configurations
- Agency registry and branding contracts

## Smart Contract Changes

### New Contracts in v3.5.0:

**Module M1 - Property Listing & Staking:**
- PropertyRegistry (SC1)
- PropertyStaking (SC2)
- AccessRightsNFT (SC3)

**Module M2 - Yield & Escrow:**
- YieldDistributor (SC4)
- EscrowManager (SC5)
- DisputeResolver (SC6)

**Module M3 - Governance:**
- GovernanceToken (SC7)
- ProposalManager (SC8)
- VotingMechanism (SC9)

**Module M4 - Fractional Ownership:**
- PropertyToken (SC10)
- LiquidityPool (SC11)
- TradingEngine (SC12)

**Module M6 - White-Label:**
- AgencyRegistry (SC13)
- BrandingConfig (SC14)

## API Endpoint Changes

### New Endpoints in v3.5.0:

**Staking:**
- POST `/properties/:id/stake` - Stake tokens for access
- GET `/access-rights` - View owned access rights
- POST `/access-rights/:id/extend` - Extend stake period

**Yield:**
- POST `/yields/calculate` - Calculate yield
- POST `/yields/distribute` - Trigger distribution
- GET `/yields/history` - View distribution history

**Governance:**
- GET `/governance/proposals` - List proposals
- POST `/governance/proposals/create` - Create proposal
- POST `/governance/vote` - Cast vote
- POST `/governance/delegate` - Delegate voting power
- GET `/governance/voting-power` - Check voting power

**Escrow & Disputes:**
- GET `/escrow/:id` - View escrow details
- POST `/disputes/raise` - Raise dispute
- GET `/disputes/:id` - View dispute status

**Fractional Trading:**
- GET `/tokens/:propertyId` - View property tokens
- POST `/trade/buy` - Buy property tokens
- POST `/trade/sell` - Sell property tokens

**White-Label:**
- POST `/agency/register` - Register agency
- PUT `/agency/config` - Configure branding
- PUT `/agency/theme` - Update theme

## User Flow Changes

### Old Flow (v3.1.0):
1. Browse properties
2. Buy property NFT
3. Own property permanently
4. Sell on marketplace

### New Flow (v3.5.0):
1. Browse properties
2. Stake tokens for time-bound access
3. Receive Access Rights NFT
4. Property owner earns yield
5. Extend or transfer access rights
6. Unstake to reclaim tokens

## Key Metrics Changes

**Old Metrics:**
- Total properties sold
- Average sale price
- Transaction volume

**New Metrics:**
- Total value staked (TVS)
- Average yield rate
- Active stakes
- Governance participation
- Dispute resolution rate

## Migration Path

For existing implementations transitioning from v3.1.0 to v3.5.0:

1. **Update Smart Contracts:**
   - Deploy 14 new contracts
   - Migrate property data to PropertyRegistry
   - Initialize governance token distribution

2. **Update Frontend:**
   - Replace "Buy" with "Stake"
   - Add Access Rights NFT display
   - Implement governance UI
   - Add yield calculator

3. **Update Backend:**
   - Add staking endpoints
   - Implement yield calculation
   - Setup Chainlink Keeper
   - Add dispute resolution APIs

4. **Update Database Schema:**
   - Add staking records
   - Track yield distributions
   - Store governance votes
   - Log dispute history

## Summary

PropUp v3.5.0 represents a paradigm shift from property ownership to property access through a sophisticated staking mechanism. This creates a more liquid, accessible, and sustainable real estate investment platform with built-in governance and dispute resolution.
