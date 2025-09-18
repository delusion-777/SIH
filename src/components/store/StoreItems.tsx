import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Coins, ShoppingCart, Filter, Star, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface StoreItem {
  id: string;
  name: string;
  category: string;
  realPrice: number;
  coinPrice: number;
  discount?: number;
  description: string;
  inStock: boolean;
  isSubsidized?: boolean;
  popular?: boolean;
}

const storeItems: StoreItem[] = [
  // Government / Subsidized Items
  {
    id: 'gov-paddy-seeds',
    name: 'Government Certified Paddy Seeds',
    category: 'Government/Subsidized',
    realPrice: 45,
    coinPrice: 120,
    discount: 30,
    description: 'High-yield variety paddy seeds from government scheme',
    inStock: true,
    isSubsidized: true,
    popular: true
  },
  {
    id: 'bio-fertilizer',
    name: 'Bio-fertilizer Pack (Govt)',
    category: 'Government/Subsidized', 
    realPrice: 180,
    coinPrice: 300,
    discount: 40,
    description: 'Organic bio-fertilizer supplied under government program',
    inStock: true,
    isSubsidized: true
  },
  {
    id: 'drip-irrigation',
    name: 'Subsidized Drip Irrigation Kit',
    category: 'Government/Subsidized',
    realPrice: 2500,
    coinPrice: 1500,
    discount: 60,
    description: 'Complete drip irrigation system with government subsidy',
    inStock: true,
    isSubsidized: true
  },
  {
    id: 'soil-health-card',
    name: 'Soil Health Testing Kit',
    category: 'Government/Subsidized',
    realPrice: 150,
    coinPrice: 200,
    description: 'Test your soil nutrients and pH levels',
    inStock: true,
    isSubsidized: true
  },

  // Bio / Organic Inputs
  {
    id: 'neem-oil',
    name: 'Neem Oil (1 Liter)',
    category: 'Bio/Organic',
    realPrice: 320,
    coinPrice: 400,
    discount: 15,
    description: 'Pure neem oil for natural pest control',
    inStock: true,
    popular: true
  },
  {
    id: 'panchagavya',
    name: 'Panchagavya Growth Promoter',
    category: 'Bio/Organic',
    realPrice: 150,
    coinPrice: 250,
    description: 'Traditional bio growth promoter made from cow products',
    inStock: true
  },
  {
    id: 'jeevamrutham',
    name: 'Jeevamrutham Liquid Fertilizer',
    category: 'Bio/Organic',
    realPrice: 80,
    coinPrice: 150,
    discount: 20,
    description: 'Liquid organic fertilizer for soil enrichment',
    inStock: true
  },
  {
    id: 'vermicompost',
    name: 'Vermicompost (25kg)',
    category: 'Bio/Organic',
    realPrice: 450,
    coinPrice: 600,
    description: 'High-quality earthworm compost for soil health',
    inStock: true
  },
  {
    id: 'trichoderma',
    name: 'Trichoderma Bio-pesticide',
    category: 'Bio/Organic',
    realPrice: 280,
    coinPrice: 350,
    description: 'Biological fungicide for crop protection',
    inStock: true
  },

  // Traditional Farming Tools
  {
    id: 'wooden-plough',
    name: 'Traditional Wooden Plough',
    category: 'Traditional Tools',
    realPrice: 1200,
    coinPrice: 800,
    discount: 25,
    description: 'Handcrafted wooden plough for sustainable farming',
    inStock: true
  },
  {
    id: 'hand-sickle',
    name: 'Steel Hand Sickle',
    category: 'Traditional Tools',
    realPrice: 85,
    coinPrice: 120,
    description: 'Sharp steel sickle for harvesting crops',
    inStock: true,
    popular: true
  },
  {
    id: 'manual-sprayer',
    name: 'Manual Hand Sprayer',
    category: 'Traditional Tools',
    realPrice: 650,
    coinPrice: 500,
    discount: 35,
    description: 'Hand-operated sprayer for organic pesticides',
    inStock: true
  },
  {
    id: 'grain-storage',
    name: 'Traditional Grain Storage Bin',
    category: 'Traditional Tools',
    realPrice: 450,
    coinPrice: 600,
    description: 'Mud and metal storage for grains',
    inStock: true
  },

  // Seeds
  {
    id: 'millet-seeds',
    name: 'Mixed Millet Seeds',
    category: 'Seeds',
    realPrice: 120,
    coinPrice: 180,
    discount: 10,
    description: 'Nutritious millet varieties for sustainable farming',
    inStock: true
  },
  {
    id: 'pulse-seeds',
    name: 'Organic Pulse Seed Kit',
    category: 'Seeds',
    realPrice: 200,
    coinPrice: 300,
    description: 'Variety pack of organic pulse seeds',
    inStock: true
  },
  {
    id: 'vegetable-seeds',
    name: 'Kitchen Garden Vegetable Seeds',
    category: 'Seeds',
    realPrice: 150,
    coinPrice: 200,
    discount: 25,
    description: 'Complete set for home vegetable garden',
    inStock: true,
    popular: true
  },
  {
    id: 'green-manure',
    name: 'Green Manure Seeds (Sunhemp)',
    category: 'Seeds',
    realPrice: 80,
    coinPrice: 120,
    description: 'Seeds for natural soil enrichment',
    inStock: true
  }
];

interface StoreItemsProps {
  farmoCoins: number;
  setFarmoCoins: (value: number | ((prev: number) => number)) => void;
}

export function StoreItems({ farmoCoins, setFarmoCoins }: StoreItemsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const categories = ['All', ...new Set(storeItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'All' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: StoreItem) => {
    if (farmoCoins >= item.coinPrice && item.inStock) {
      setFarmoCoins(prev => prev - item.coinPrice);
      setPurchasedItems(prev => [...prev, item.id]);
      toast.success(`Successfully purchased ${item.name}!`, {
        description: `Spent ${item.coinPrice} Farmo Coins`
      });
    } else {
      toast.error('Insufficient coins or item out of stock!');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government/Subsidized': return '🏛️';
      case 'Bio/Organic': return '🌿';
      case 'Traditional Tools': return '🔨';
      case 'Seeds': return '🌱';
      default: return '📦';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Store Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-amber-800">Farmo Store</h1>
        <p className="text-amber-600 max-w-2xl mx-auto">
          Discover authentic farming tools, organic inputs, and traditional seeds. 
          Support sustainable agriculture with government subsidized items and organic alternatives.
        </p>
        
        <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 rounded-full">
          <Coins className="text-amber-800" size={24} />
          <span className="font-bold text-amber-800 text-xl">{farmoCoins} Farmo Coins</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            {category !== 'All' && getCategoryIcon(category)} {category}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <Card 
            key={item.id} 
            className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
          >
            {/* Popular Badge */}
            {item.popular && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-800 border-0">
                  <Star size={12} className="mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            {/* Discount Badge */}
            {item.discount && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-red-500 text-white">
                  {item.discount}% OFF
                </Badge>
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-amber-800 leading-tight">
                  {item.name}
                </CardTitle>
                {!item.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
                {item.isSubsidized && (
                  <Badge className="bg-green-600 text-white">
                    Subsidized
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="w-fit text-xs text-amber-600 border-amber-300">
                {item.category}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-amber-700 leading-relaxed">{item.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-600">Real Price:</span>
                  <span className={`font-semibold ${item.discount ? 'line-through text-amber-500' : 'text-amber-800'}`}>
                    ₹{item.realPrice}
                  </span>
                </div>
                
                {item.discount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Discounted:</span>
                    <span className="font-semibold text-green-600">
                      ₹{Math.round(item.realPrice * (1 - item.discount / 100))}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between bg-amber-100 p-2 rounded-lg">
                  <span className="text-sm text-amber-700 font-medium">Coin Price:</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="text-amber-600" size={16} />
                    <span className="font-bold text-amber-800">{item.coinPrice}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              {purchasedItems.includes(item.id) ? (
                <Button disabled className="w-full bg-green-600 text-white">
                  <CheckCircle size={16} className="mr-2" />
                  Purchased
                </Button>
              ) : (
                <Button
                  onClick={() => handlePurchase(item)}
                  disabled={!item.inStock || farmoCoins < item.coinPrice}
                  className={`w-full ${
                    farmoCoins >= item.coinPrice && item.inStock
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {!item.inStock 
                    ? 'Out of Stock'
                    : farmoCoins >= item.coinPrice 
                      ? 'Purchase' 
                      : 'Insufficient Coins'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Store Info */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl border-2 border-amber-200">
        <h3 className="text-xl font-bold text-amber-800 mb-4">About Our Store</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-amber-700">
          <div>
            <h4 className="font-semibold mb-2">🏛️ Government Subsidized Items</h4>
            <p>Access authentic government schemes with certified seeds, bio-fertilizers, and irrigation systems at subsidized rates.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🌿 Organic & Traditional</h4>
            <p>Premium organic inputs like Neem oil, Panchagavya, and traditional farming tools that have been used for generations.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🌱 Quality Seeds</h4>
            <p>Certified high-yield varieties, millets, pulses, and vegetable seeds perfect for sustainable farming practices.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">💰 Earn More Coins</h4>
            <p>Complete daily quizzes, missions, and community activities to earn Farmo Coins for your purchases.</p>
          </div>
        </div>
      </div>
    </div>
  );
}