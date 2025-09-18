import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Plus,
  Filter,
  Search,
  TrendingUp,
  Clock,
  Users,
  Award,
  Sprout,
  Bug,
  Droplets,
  Sun,
  Upload,
  Camera
} from 'lucide-react';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface Post {
  id: string;
  author: string;
  authorInitials: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  timeAgo: string;
  isLiked: boolean;
  tags: string[];
  badge?: string;
  image?: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Ravi Kumar',
    authorInitials: 'RK',
    title: 'Successful Organic Pest Control with Neem Oil',
    content: 'I\'ve been using neem oil for the past season and the results are amazing! My cotton crop is pest-free and the yield is better than ever. Here\'s my recipe: 2ml neem oil + 1ml liquid soap per liter of water. Spray early morning or late evening.',
    category: 'Pest Control',
    likes: 45,
    replies: 12,
    timeAgo: '2 hours ago',
    isLiked: false,
    tags: ['organic', 'pest-control', 'neem', 'cotton'],
    badge: 'Organic Expert'
  },
  {
    id: '2',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    title: 'Drip Irrigation Setup - Government Subsidy Experience',
    content: 'Just completed installing drip irrigation with 60% government subsidy through PM-KUSUM scheme. The process was smooth and now my water usage is down by 40%. Happy to share the application process with anyone interested.',
    category: 'Government Schemes',
    likes: 67,
    replies: 23,
    timeAgo: '5 hours ago',
    isLiked: true,
    tags: ['irrigation', 'subsidy', 'water-saving', 'pm-kusum'],
    badge: 'Scheme Navigator'
  },
  {
    id: '3',
    author: 'Suresh Patel',
    authorInitials: 'SP',
    title: 'Ancient Panchagavya Recipe for Soil Health',
    content: 'My grandfather\'s panchagavya recipe has transformed my soil health. Mix: 5kg fresh cow dung + 3L cow urine + 2L milk + 2L curd + 1kg jaggery + handful of banana + coconut water. Ferment for 21 days. Use 30ml per liter of water.',
    category: 'Traditional Techniques',
    likes: 89,
    replies: 34,
    timeAgo: '1 day ago',
    isLiked: false,
    tags: ['panchagavya', 'traditional', 'soil-health', 'organic'],
    badge: 'Tradition Keeper'
  },
  {
    id: '4',
    author: 'Meera Devi',
    authorInitials: 'MD',
    title: 'Millet Cultivation Success Story - From 1 acre to 10 acres',
    content: 'Started with 1 acre of pearl millet 3 years ago. Today I have 10 acres and supply to 5 different organic stores. The demand for millets is huge! Key tips: choose drought-resistant varieties, use minimal water, harvest at right time.',
    category: 'Crop Tips',
    likes: 123,
    replies: 45,
    timeAgo: '2 days ago',
    isLiked: true,
    tags: ['millet', 'scaling', 'drought-resistant', 'success-story'],
    badge: 'Scale Master'
  },
  {
    id: '5',
    author: 'Krishna Reddy',
    authorInitials: 'KR',
    title: 'Tank Irrigation Revival Project in Our Village',
    content: 'We revived a 200-year-old tank irrigation system in our village. Now 50 families benefit from it during drought seasons. The traditional knowledge combined with modern maintenance is working perfectly. Sharing our approach and learnings.',
    category: 'Water Management',
    likes: 78,
    replies: 19,
    timeAgo: '3 days ago',
    isLiked: false,
    tags: ['tank-irrigation', 'revival', 'community', 'traditional'],
    badge: 'Water Warrior'
  }
];

const categories = [
  { id: 'all', name: 'All Topics', icon: MessageSquare, count: 156 },
  { id: 'crops', name: 'Crop Tips', icon: Sprout, count: 45 },
  { id: 'traditional', name: 'Traditional Methods', icon: Award, count: 23 },
  { id: 'government', name: 'Govt Schemes', icon: Users, count: 34 },
  { id: 'pest', name: 'Pest Control', icon: Bug, count: 28 },
  { id: 'irrigation', name: 'Water & Irrigation', icon: Droplets, count: 19 },
  { id: 'organic', name: 'Organic Methods', icon: Sun, count: 67 }
];

export function CommunityHub() {
  const [posts, setPosts] = useState(samplePosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        if (!wasLiked) {
          toast.success('Post liked! +2 Farmo Coins earned');
        }
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePostSubmit = () => {
    if (newPost.trim() && newPostTitle.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You',
        authorInitials: 'YU',
        title: newPostTitle,
        content: newPost,
        category: 'General',
        likes: 0,
        replies: 0,
        timeAgo: 'Just now',
        isLiked: false,
        tags: ['new'],
        badge: 'New Member'
      };
      
      setPosts([post, ...posts]);
      setNewPost('');
      setNewPostTitle('');
      setShowNewPost(false);
      toast.success('Post shared! +10 Farmo Coins earned');
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => 
        post.category.toLowerCase().includes(selectedCategory) ||
        post.tags.some(tag => tag.includes(selectedCategory))
      );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-800">
                <Filter size={20} />
                <span>Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-amber-600 text-white'
                        : 'hover:bg-amber-100 text-amber-700 hover:text-amber-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={16} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        selectedCategory === category.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-amber-200 text-amber-800'
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-amber-800">Community Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-600">Total Posts</span>
                <span className="font-bold text-amber-800">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-600">Active Farmers</span>
                <span className="font-bold text-amber-800">567</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-600">Problems Solved</span>
                <span className="font-bold text-amber-800">892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-600">Knowledge Shared</span>
                <span className="font-bold text-green-600">∞</span>
              </div>
            </CardContent>
          </Card>

          {/* Upload Photo Challenge */}
          <Card className="border-amber-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <Camera size={20} />
                <span>Photo Challenge</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-green-700">Share your farm photos and earn rewards!</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Upload size={16} className="mr-2" />
                Upload Photo
              </Button>
              <div className="text-xs text-green-600 text-center">
                +15 Farmo Coins per photo
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header & New Post */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-amber-800">Community Forum</h2>
              <p className="text-amber-600">Share knowledge, ask questions, grow together</p>
            </div>
            
            <Button 
              onClick={() => setShowNewPost(true)} 
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Plus size={16} className="mr-2" />
              New Post
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
            <Input 
              placeholder="Search discussions, tips, techniques..." 
              className="pl-10 border-amber-300 focus:border-amber-500"
            />
          </div>

          {/* New Post Form */}
          {showNewPost && (
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-amber-800">Share Your Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="border-amber-300"
                />
                <Textarea
                  placeholder="What farming tip or question would you like to share with the community?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={4}
                  className="border-amber-300"
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewPost(false)}
                    className="border-amber-300 text-amber-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handlePostSubmit}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Post & Earn 10 Coins
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id} 
                className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="border-2 border-amber-200">
                      <AvatarFallback className="bg-amber-200 text-amber-800 font-semibold">
                        {post.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-amber-800">{post.author}</h3>
                        {post.badge && (
                          <Badge className="bg-green-600 text-white text-xs">
                            {post.badge}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-amber-600">
                          <Clock size={12} className="mr-1" />
                          {post.timeAgo}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-amber-900 mb-2">{post.title}</h4>
                      <p className="text-sm text-amber-700 mb-3 leading-relaxed">
                        {post.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs bg-amber-100 text-amber-700 border-amber-300"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 text-sm transition-colors ${
                            post.isLiked 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-amber-600 hover:text-amber-800'
                          }`}
                        >
                          <ThumbsUp size={16} className={post.isLiked ? 'fill-current' : ''} />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-800 transition-colors">
                          <MessageSquare size={16} />
                          <span className="font-medium">{post.replies}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-800 transition-colors">
                          <Share2 size={16} />
                          <span className="font-medium">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center py-6">
            <Button 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}