import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Search, MapPin, TrendingUp, Shield, Zap } from 'lucide-react';

/**
 * LandingPage Component
 * 
 * Main landing page for PropUp featuring:
 * - Hero section with AI-powered search
 * - Featured properties carousel
 * - Platform benefits
 * - Call-to-action sections
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen" data-testid="landing-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-testid="hero-title">
              Decentralized Property Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="hero-subtitle">
              Buy, sell, and tokenize real estate with blockchain technology. 
              Fractional ownership made simple.
            </p>
          </div>

          {/* AI-Powered Search Bar */}
          <div className="max-w-3xl mx-auto">
            <Card data-testid="search-card">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Input
                    data-testid="search-input"
                    placeholder="Search by location, property type, or ask AI..."
                    className="flex-1"
                  />
                  <Button data-testid="search-button" size="lg">
                    <Search className="mr-2 h-5 w-5" />
                    Search
                  </Button>
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button variant="outline" size="sm" data-testid="filter-residential">Residential</Button>
                  <Button variant="outline" size="sm" data-testid="filter-commercial">Commercial</Button>
                  <Button variant="outline" size="sm" data-testid="filter-fractional">Fractional Ownership</Button>
                  <Button variant="outline" size="sm" data-testid="filter-crowdfunding">Crowdfunding</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="features-title">Why Choose PropUp?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card data-testid="feature-tokenization">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Property Tokenization</CardTitle>
                <CardDescription>
                  Convert properties into NFTs for fractional ownership and easier trading
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card data-testid="feature-security">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Secure & Compliant</CardTitle>
                <CardDescription>
                  KYC/AML verified transactions with smart contract security
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card data-testid="feature-yields">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Earn Yields</CardTitle>
                <CardDescription>
                  Generate passive income through rental yields and staking rewards
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="featured-properties-title">
            Featured Properties
          </h2>
          <div className="grid md:grid-cols-3 gap-8" data-testid="property-grid">
            {/* Property cards will be loaded dynamically */}
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
          <div className="text-center mt-8">
            <Button size="lg" data-testid="view-all-properties">View All Properties</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="cta-title">Ready to Start Investing?</h2>
          <p className="text-xl mb-8" data-testid="cta-description">
            Connect your wallet and explore fractional property ownership opportunities
          </p>
          <Button size="lg" variant="secondary" data-testid="cta-connect-wallet">
            Connect Wallet
          </Button>
        </div>
      </section>
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <Card data-testid="property-card-skeleton">
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
