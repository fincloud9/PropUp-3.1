import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Bed, Bath, Square, TrendingUp, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

/**
 * PropertyDetailPage Component
 * 
 * Detailed property view with:
 * - Property images and media
 * - Property specifications
 * - Tokenization details
 * - Purchase/invest options
 * - AI valuation
 * - Location map
 */
export default function PropertyDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-testid="property-detail-page">
      <div className="max-w-7xl mx-auto px-4">
        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="aspect-video bg-gray-200 rounded-lg" data-testid="property-main-image">
            {/* Main property image */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-200 rounded-lg" data-testid="property-image-1" />
            <div className="aspect-square bg-gray-200 rounded-lg" data-testid="property-image-2" />
            <div className="aspect-square bg-gray-200 rounded-lg" data-testid="property-image-3" />
            <div className="aspect-square bg-gray-200 rounded-lg" data-testid="property-image-4" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card data-testid="property-header-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl mb-2" data-testid="property-title">
                      Modern Luxury Apartment
                    </CardTitle>
                    <div className="flex items-center text-gray-600 mb-4" data-testid="property-location">
                      <MapPin className="h-4 w-4 mr-2" />
                      123 Main St, New York, NY 10001
                    </div>
                    <div className="flex gap-2">
                      <Badge data-testid="badge-residential">Residential</Badge>
                      <Badge variant="secondary" data-testid="badge-tokenized">Tokenized</Badge>
                      <Badge variant="outline" data-testid="badge-fractional">Fractional</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" data-testid="share-button">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center" data-testid="property-bedrooms">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">3</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center" data-testid="property-bathrooms">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">2</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center" data-testid="property-area">
                    <Square className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">1,500</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center" data-testid="property-yield">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">5.2%</div>
                    <div className="text-sm text-gray-600">Yield</div>
                  </div>
                </div>
                <p className="text-gray-700" data-testid="property-description">
                  Beautiful modern apartment in the heart of the city. Features include hardwood floors,
                  stainless steel appliances, and panoramic city views. Perfect for urban professionals
                  seeking luxury living.
                </p>
              </CardContent>
            </Card>

            {/* Tokenization Details */}
            <Card data-testid="tokenization-card">
              <CardHeader>
                <CardTitle>Tokenization Details</CardTitle>
                <CardDescription>NFT and fractional ownership information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between" data-testid="token-standard">
                    <span className="text-gray-600">Token Standard:</span>
                    <span className="font-semibold">ERC-721</span>
                  </div>
                  <div className="flex justify-between" data-testid="token-id">
                    <span className="text-gray-600">Token ID:</span>
                    <span className="font-mono text-sm">0x1234...5678</span>
                  </div>
                  <div className="flex justify-between" data-testid="total-tokens">
                    <span className="text-gray-600">Total Tokens:</span>
                    <span className="font-semibold">1,000</span>
                  </div>
                  <div className="flex justify-between" data-testid="available-tokens">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-semibold">350</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Valuation */}
            <Card data-testid="ai-valuation-card">
              <CardHeader>
                <CardTitle>AI Valuation</CardTitle>
                <CardDescription>Powered by PropUp AI Engine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Value:</span>
                    <span className="text-2xl font-bold" data-testid="ai-estimated-value">$750,000</span>
                  </div>
                  <div className="flex justify-between" data-testid="confidence-interval">
                    <span className="text-gray-600">Confidence Interval:</span>
                    <span className="font-semibold">±8%</span>
                  </div>
                  <div className="text-sm text-gray-600" data-testid="valuation-last-updated">
                    Last updated: 2 hours ago
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card data-testid="purchase-card">
              <CardHeader>
                <CardTitle className="text-2xl" data-testid="property-price">$750,000</CardTitle>
                <CardDescription>or $750 per token</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" data-testid="buy-property-button">
                  Buy Property
                </Button>
                <Button className="w-full" variant="outline" size="lg" data-testid="buy-tokens-button">
                  Buy Fractional Tokens
                </Button>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Min. Investment:</span>
                    <span className="font-semibold" data-testid="min-investment">$1,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected Yield:</span>
                    <span className="font-semibold text-green-600" data-testid="expected-yield">5.2% APY</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KYC Status */}
            <Card data-testid="kyc-status-card">
              <CardHeader>
                <CardTitle>Verification Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Complete KYC verification to invest in this property
                </p>
                <Button variant="outline" className="w-full" data-testid="kyc-verify-button">
                  Verify Identity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
