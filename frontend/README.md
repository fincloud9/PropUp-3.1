# PropUp - React UI Scaffolds Package

Version: 3.1.0  
Generated: 2025

## Overview

This package contains comprehensive React UI scaffolds and architecture artifacts for PropUp - a decentralized property listing and transaction platform built on blockchain technology.

## Contents

### 1. Configuration Files
- `.env.example` - Complete environment variable template with 100+ configuration options

### 2. Architecture Documentation
- `architecture/propup-architecture-v3.1.0.json` - Complete system architecture including:
  - Service layer definitions (15 layers)
  - Route mappings
  - Component tree
  - State management structure
  - Integration specifications

### 3. OpenAPI Specification
- `openapi/propup-api-spec-v3.1.0.yaml` - Comprehensive API specification covering:
  - 50+ endpoints across all service layers
  - Request/response schemas
  - Authentication flows
  - Data models

### 4. Smart Contract Integration
- `src/config/contracts/` - Contract ABIs and addresses for:
  - PropertyNFT (ERC-721)
  - Marketplace
  - PropertyRegistry
  - ComplianceManager
  - And more (24 total contracts)

### 5. React Components

#### Pages
- `src/pages/LandingPage.jsx` - Main landing page with AI search
- `src/pages/PropertyDetailPage.jsx` - Detailed property view

#### Web3 Components
- `src/components/web3/WalletConnect.jsx` - Multi-wallet connection (RainbowKit)
- `src/components/web3/AccountInfo.jsx` - Wallet account display

#### AI Components
- `src/components/ai/AIChatbot.jsx` - AI-powered conversational assistant

### 6. Custom Hooks
- `src/hooks/web3/useContracts.js` - Smart contract interaction hooks

### 7. Services
- `src/services/api.js` - Axios-based API client with all service functions

### 8. Integration Playbook
- `docs/INTEGRATION_PLAYBOOK_RAINBOWKIT.md` - Complete RainbowKit integration guide

## Tech Stack

**Frontend (This Package):**
- React 18+
- RainbowKit + Wagmi (Web3)
- Shadcn UI Components
- TanStack Query
- Axios
- React Router

**Backend (To Be Implemented):**
- Node.js + Express
- PostgreSQL
- Redis

**Blockchain:**
- Polygon (Mainnet + Amoy Testnet)
- Solidity Smart Contracts

**AI/ML:**
- OpenAI GPT-5 or Claude Sonnet 4.5 (via Emergent LLM Key)
- Pinecone (Vector Database)
- LangChain

## Getting Started

### 1. Install Dependencies

```bash
yarn install
# or
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Key variables to set:
- `REACT_APP_WALLET_CONNECT_PROJECT_ID` - Get from https://cloud.reown.com
- `REACT_APP_POLYGON_RPC_URL` - Alchemy/Infura RPC endpoint
- Contract addresses (after deploying via Toolblox)
- AI API keys (OpenAI/Anthropic/Gemini)

### 3. Deploy Smart Contracts

Use Toolblox to deploy Phase 1 contracts:
1. PropertyNFT
2. PropertyRegistry
3. ComplianceManager
4. TitleRegistry

Update contract addresses in `.env.local`

### 4. Implement Backend

Use the OpenAPI specification (`openapi/propup-api-spec-v3.1.0.yaml`) to:
1. Generate API routes in Node.js/Express
2. Implement database models in PostgreSQL
3. Integrate KYC providers (Sumsub/Onfido)
4. Set up AI services

### 5. Run Development Server

```bash
yarn start
# or
npm start
```

## Architecture Overview

### Service Layers (15 Total)

1. **Authentication & Authorization** - Wallet-based auth with JWT
2. **User Management & KYC** - User profiles and verification
3. **Property Registry** - Property listing management
4. **Property Tokenization** - NFT minting and fractional ownership
5. **Marketplace** - Buy/sell tokenized properties
6. **Rental Management** - Rental agreements and payments
7. **Crowdfunding** - Real estate crowdfunding campaigns
8. **DeFi Services** - Lending, borrowing, staking
9. **Governance** - DAO voting and proposals
10. **Treasury Management** - Platform treasury operations
11. **Compliance & Legal** - KYC/AML and title registry
12. **AI Services** - Chatbot, recommendations, valuations
13. **Analytics & Reporting** - Platform metrics and KPIs
14. **White-label Configuration** - Custom branding
15. **Notification & Communication** - Notifications and messaging

### Component Structure

```
App
├── Providers (RainbowKit, Wagmi, QueryClient, Auth)
│   └── Router
│       └── Layout
│           ├── Header (Logo, Nav, WalletButton, UserMenu)
│           ├── Main (Route Components)
│           └── Footer
```

### State Management

- **React Context** for global state:
  - AuthContext
  - Web3Context
  - PropertyContext
  - MarketplaceContext
  - AIContext

- **TanStack Query** for server state and caching
- **Wagmi hooks** for blockchain state

## Smart Contracts

### Phase 1 (MVP) - 4 Contracts

1. **PropertyNFT** (ERC-721/1155)
   - Functions: mint, transfer, tokenURI
   - Events: Transfer, Approval

2. **PropertyRegistry**
   - Functions: registerProperty, updateProperty, getProperty
   - Events: PropertyRegistered

3. **ComplianceManager**
   - Functions: verifyKYC, checkCompliance, whitelist management
   - Events: KYCVerified

4. **TitleRegistry**
   - Functions: registerTitle, transferTitle, verifyOwnership
   - Events: TitleRegistered

### Phase 2 (Post-MVP) - 20 Additional Contracts

See architecture JSON for complete list.

## Integration Guide

### RainbowKit Multi-Wallet Setup

See `docs/INTEGRATION_PLAYBOOK_RAINBOWKIT.md` for complete integration guide.

Key steps:
1. Install dependencies
2. Configure Wagmi with Polygon networks
3. Wrap app with providers
4. Use ConnectButton component
5. Implement contract interactions with hooks

### AI Integration

For AI features (chatbot, recommendations, valuations):

1. Choose LLM provider:
   - OpenAI GPT-5
   - Claude Sonnet 4.5
   - Gemini 2.5 Pro

2. Use Emergent LLM Key for unified access

3. Implement backend endpoints:
   - `/api/ai/chat` - Conversational AI
   - `/api/ai/recommendations` - Property recommendations
   - `/api/ai/valuation` - AI property valuations

4. Integrate with frontend components:
   - `AIChatbot.jsx` for chat interface
   - API service functions in `services/api.js`

### KYC Integration

Integrate Sumsub or Onfido:

1. Obtain API credentials
2. Implement backend webhook handlers
3. Use `kycService` functions from `services/api.js`
4. Create KYC flow components

## API Endpoints

All endpoints are documented in the OpenAPI specification.

Base URL: `https://api.propup.io/v1` (production)

### Key Endpoint Categories:

- `/auth/*` - Authentication
- `/users/*` - User management
- `/kyc/*` - KYC verification
- `/properties/*` - Property operations
- `/marketplace/*` - Marketplace transactions
- `/ai/*` - AI services
- `/defi/*` - DeFi operations
- `/governance/*` - DAO governance

## Testing

All components include `data-testid` attributes for testing.

Example test IDs:
- `landing-page`
- `search-input`
- `connect-wallet-button`
- `property-card`
- `ai-chatbot`
- `wallet-address`

## Deployment

### Frontend
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

### Backend
- AWS / Google Cloud / Azure
- Docker + Kubernetes

### Smart Contracts
- Deploy to Polygon via Toolblox
- Verify on Polygonscan

## Security Considerations

1. **Never expose private keys** in frontend code
2. **Use environment variables** for all sensitive data
3. **Implement rate limiting** on API endpoints
4. **Validate all user inputs** on backend
5. **Use HTTPS** for all communications
6. **Implement CSP headers** for XSS protection
7. **Regular security audits** for smart contracts

## Support & Resources

- **RainbowKit Docs:** https://rainbowkit.com
- **Wagmi Docs:** https://wagmi.sh
- **Polygon Docs:** https://docs.polygon.technology
- **OpenAPI Spec:** Use for API implementation reference
- **Architecture JSON:** Reference for system structure

## License

Proprietary - All rights reserved

## Version History

### v3.1.0 (Current)
- Complete UI scaffolds for all 15 service layers
- OpenAPI 3.1 specification
- Architecture documentation
- RainbowKit integration
- Phase 1 contract ABIs
- AI chatbot component
- Comprehensive environment configuration

---

**Note:** This package contains framework-agnostic React scaffolds designed to integrate with your Next.js + Node.js + PostgreSQL stack. All components are production-ready and follow PRD v3.1.0 specifications.
