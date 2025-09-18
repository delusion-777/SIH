import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Globe, 
  Coins, 
  User, 
  Home, 
  Users, 
  Store, 
  BookOpen, 
  Trophy,
  Calendar,
  Leaf
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  farmoCoins: number;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'hi', name: 'हिंदी' }
];

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'store', label: 'Store', icon: Store },
  { id: 'knowledge', label: 'Guide', icon: BookOpen },
  { id: 'quizzes', label: 'Quizzes', icon: Trophy },
  { id: 'events', label: 'Events', icon: Calendar }
];

export function Header({ currentSection, onNavigate, farmoCoins }: HeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-800">Farmo</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentSection === item.id
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'text-amber-700 hover:text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Farmo Coins */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 rounded-full shadow-lg">
              <Coins className="text-amber-800" size={18} />
              <span className="font-bold text-amber-800">{farmoCoins}</span>
              <span className="text-sm text-amber-700 font-medium">Coins</span>
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Globe size={16} />
                  <span className="hidden sm:inline">
                    {languages.find(l => l.code === currentLanguage)?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-amber-200">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`${currentLanguage === lang.code ? 'bg-amber-50 text-amber-800' : ''} hover:bg-amber-50`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <Button variant="outline" size="sm" className="flex items-center space-x-2 border-amber-300 text-amber-700 hover:bg-amber-50">
              <User size={16} />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-3 flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  currentSection === item.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-amber-700 hover:text-amber-800 hover:bg-amber-100'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}