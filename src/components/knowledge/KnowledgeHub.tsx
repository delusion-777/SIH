import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BookOpen, Video, Download, Search, Filter, Clock, Eye } from 'lucide-react';
import { Input } from '../ui/input';

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  type: 'article' | 'video' | 'guide';
  content: string;
  readTime: string;
  views: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const knowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    title: 'Traditional Tank Irrigation Systems',
    category: 'Water Management',
    type: 'article',
    content: 'Learn about ancient Indian tank irrigation systems that efficiently store rainwater for year-round farming. These systems have sustained agriculture for over 2000 years.',
    readTime: '5 min',
    views: 1234,
    difficulty: 'beginner',
    tags: ['irrigation', 'traditional', 'water conservation']
  },
  {
    id: '2',
    title: 'Mastering Terrace Farming Techniques',
    category: 'Soil Conservation',
    type: 'guide',
    content: 'Complete guide to implementing terrace farming on sloped land. Prevent soil erosion while maximizing agricultural productivity in hilly regions.',
    readTime: '12 min',
    views: 856,
    difficulty: 'intermediate',
    tags: ['terrace farming', 'soil conservation', 'hills']
  },
  {
    id: '3',
    title: 'Organic Pest Control with Neem',
    category: 'Natural Farming',
    type: 'video',
    content: 'Step-by-step video guide on preparing and applying neem oil solutions for effective organic pest control in various crops.',
    readTime: '8 min',
    views: 2341,
    difficulty: 'beginner',
    tags: ['neem oil', 'pest control', 'organic']
  },
  {
    id: '4',
    title: 'Crop Rotation for Soil Health',
    category: 'Sustainable Practices',
    type: 'article',
    content: 'Understand the science behind crop rotation and how legume-cereal cycles naturally enrich soil nitrogen and improve yields.',
    readTime: '7 min',
    views: 1567,
    difficulty: 'intermediate',
    tags: ['crop rotation', 'soil health', 'nitrogen fixing']
  },
  {
    id: '5',
    title: 'Preparing Panchagavya at Home',
    category: 'Organic Farming',
    type: 'guide',
    content: 'Traditional recipe for preparing Panchagavya growth promoter using cow products. Boost plant growth naturally with this time-tested formula.',
    readTime: '15 min',
    views: 923,
    difficulty: 'beginner',
    tags: ['panchagavya', 'organic fertilizer', 'traditional']
  },
  {
    id: '6',
    title: 'Modern Drip Irrigation Setup',
    category: 'Water Management',
    type: 'video',
    content: 'Complete installation guide for setting up efficient drip irrigation systems. Reduce water usage by 40% while improving crop yields.',
    readTime: '20 min',
    views: 1789,
    difficulty: 'advanced',
    tags: ['drip irrigation', 'water efficiency', 'modern farming']
  },
  {
    id: '7',
    title: 'Monsoon Field Preparation',
    category: 'Weather Management',
    type: 'article',
    content: 'Essential steps for preparing fields before monsoon season. Create proper drainage, build bunds, and protect crops from excess water.',
    readTime: '10 min',
    views: 1456,
    difficulty: 'intermediate',
    tags: ['monsoon', 'field preparation', 'drainage']
  },
  {
    id: '8',
    title: 'Vermicompost Production Guide',
    category: 'Organic Farming',
    type: 'guide',
    content: 'Set up your own vermicompost unit to produce high-quality organic fertilizer. Learn earthworm management and harvesting techniques.',
    readTime: '18 min',
    views: 1123,
    difficulty: 'intermediate',
    tags: ['vermicompost', 'earthworms', 'organic fertilizer']
  }
];

export function KnowledgeHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const categories = ['All', ...new Set(knowledgeItems.map(item => item.category))];
  const types = ['All', 'article', 'video', 'guide'];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Video;
      case 'guide': return Download;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-amber-800">Knowledge Hub</h1>
        <p className="text-amber-600 max-w-2xl mx-auto">
          Explore traditional farming wisdom and modern sustainable practices. 
          Learn from centuries of agricultural knowledge and cutting-edge techniques.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
          <Input
            placeholder="Search knowledge articles, guides, and videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-amber-300 focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-amber-700 flex items-center">
              <Filter size={16} className="mr-1" /> Category:
            </span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-amber-700">Type:</span>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all capitalize ${
                  selectedType === type
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Knowledge Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <Card 
              key={item.id}
              className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <TypeIcon className="text-amber-600" size={20} />
                    <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
                      {item.category}
                    </Badge>
                  </div>
                  <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg text-amber-800 leading-tight">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-amber-700 leading-relaxed">
                  {item.content}
                </p>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs bg-amber-100 text-amber-700"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-amber-600">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{item.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{item.views.toLocaleString()} views</span>
                  </div>
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  <TypeIcon size={16} className="mr-2" />
                  {item.type === 'video' ? 'Watch Video' : 
                   item.type === 'guide' ? 'Download Guide' : 'Read Article'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-amber-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-amber-800 mb-2">No knowledge items found</h3>
          <p className="text-amber-600">Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Knowledge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-800">{knowledgeItems.length}</div>
            <div className="text-sm text-amber-600">Total Articles</div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-800">{categories.length - 1}</div>
            <div className="text-sm text-amber-600">Categories</div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-800">
              {knowledgeItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-amber-600">Total Views</div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-amber-800">
              {knowledgeItems.filter(item => item.type === 'video').length}
            </div>
            <div className="text-sm text-amber-600">Video Guides</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}