import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Store, 
  Trophy, 
  Coins,
  ArrowRight,
  Leaf,
  Target,
  Award,
  Sprout,
  BookOpen
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomeBannerProps {
  onNavigate: (page: string) => void;
}

const quickLinks = [
  {
    title: 'Quiz of the Week',
    description: 'Test your sustainable farming knowledge',
    icon: Trophy,
    page: 'quizzes',
    color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    reward: '50 Coins'
  },
  {
    title: 'Community Highlight',
    description: 'Join discussions with fellow farmers',
    icon: Users,
    page: 'community',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    highlight: 'New Posts'
  },
  {
    title: 'Store Deals',
    description: 'Get organic seeds and tools',
    icon: Store,
    page: 'store',
    color: 'bg-gradient-to-br from-amber-500 to-orange-500',
    highlight: '30% Off'
  },
  {
    title: 'Govt. Scheme',
    description: 'PM-KISAN payment status',
    icon: Award,
    page: 'knowledge',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
    highlight: 'Check Now'
  }
];

export function HomeBanner({ onNavigate }: HomeBannerProps) {
  return (
    <div className="space-y-8">
      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1628179148156-d9cfac053d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGZhcm1pbmclMjByaWNlJTIwcGFkZHklMjBmaWVsZHxlbnwxfHx8fDE3NTgyMDE2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080")`
          }}
        ></div>
        
        <div className="relative z-10 px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sprout className="mr-2" size={16} />
              Sustainable Future Starts Here
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Join the Sustainable 
              <br />
              <span className="text-yellow-300">Farming Movement</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Learn traditional techniques, earn rewards, connect with farmers, and build a greener tomorrow
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg" 
                className="bg-white text-amber-800 hover:bg-white/90 px-8 font-semibold"
                onClick={() => onNavigate('quizzes')}
              >
                <Target className="mr-2" size={20} />
                Start Learning Today
                <ArrowRight className="ml-2" size={20} />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
                onClick={() => onNavigate('community')}
              >
                <Users className="mr-2" size={20} />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100"
              onClick={() => onNavigate(link.page)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`${link.color} p-3 rounded-xl flex-shrink-0 shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-amber-800">{link.title}</h3>
                      {(link.reward || link.highlight) && (
                        <Badge 
                          className={`${link.reward ? 'bg-yellow-400 text-yellow-800' : 'bg-red-500 text-white'} font-medium`}
                        >
                          {link.reward || link.highlight}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-amber-700 leading-relaxed">
                      {link.description}
                    </p>
                    
                    <div className="mt-3 flex items-center text-amber-600 hover:text-amber-800 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="ml-1" size={16} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mission Statement */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100">
        <CardContent className="p-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-4 rounded-full">
                <Leaf className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-amber-800">Our Mission</h2>
            <p className="text-amber-700 text-lg leading-relaxed">
              Farmo bridges the gap between traditional farming wisdom and modern sustainable practices. 
              We empower young farmers with gamified learning, community support, and access to authentic 
              government schemes and organic farming resources.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge className="bg-green-600 text-white px-4 py-2">Sustainable Agriculture</Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">Traditional Wisdom</Badge>
              <Badge className="bg-purple-600 text-white px-4 py-2">Modern Innovation</Badge>
              <Badge className="bg-orange-600 text-white px-4 py-2">Community Learning</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-green-800 font-semibold">Active Farmers</div>
            <div className="text-sm text-green-600 mt-1">Growing Sustainably</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">50,000+</div>
            <div className="text-amber-800 font-semibold">Trees Planted</div>
            <div className="text-sm text-amber-600 mt-1">Carbon Offset</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">1M+</div>
            <div className="text-yellow-800 font-semibold">Farmo Coins Earned</div>
            <div className="text-sm text-yellow-600 mt-1">Rewards Distributed</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}