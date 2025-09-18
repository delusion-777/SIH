import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
  Leaf
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' }
];

const govtLinks = [
  { name: 'Ministry of Agriculture', url: 'https://agricoop.nic.in/' },
  { name: 'PM-KISAN Scheme', url: 'https://pmkisan.gov.in/' },
  { name: 'Soil Health Card', url: 'https://soilhealth.dac.gov.in/' },
  { name: 'PM Fasal Bima Yojana', url: 'https://pmfby.gov.in/' },
  { name: 'NABARD', url: 'https://www.nabard.org/' },
  { name: 'Kisan Call Centre', url: 'https://mkisan.gov.in/' }
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: '#', color: 'text-blue-600 hover:text-blue-700' },
  { name: 'Twitter', icon: Twitter, url: '#', color: 'text-blue-400 hover:text-blue-500' },
  { name: 'Instagram', icon: Instagram, url: '#', color: 'text-pink-600 hover:text-pink-700' },
  { name: 'YouTube', icon: Youtube, url: '#', color: 'text-red-600 hover:text-red-700' }
];

export function Footer() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-100 to-orange-100 border-t-2 border-amber-200 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-800">Farmo</h3>
              </div>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              Empowering sustainable farming through technology, education, and community collaboration across India.
            </p>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-600 text-white">
                Certified Sustainable
              </Badge>
              <Badge className="bg-amber-600 text-white">
                ISO 14001
              </Badge>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-amber-800">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-amber-700">
                <Phone size={16} />
                <span>1800-123-FARM (3276)</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-700">
                <Mail size={16} />
                <span>support@farmo.in</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-700">
                <MapPin size={16} />
                <span>New Delhi, India</span>
              </div>
            </div>
            <div className="bg-amber-200 p-3 rounded-lg">
              <p className="text-xs text-amber-800 font-medium">
                📞 Free helpline available 24/7 in all regional languages
              </p>
            </div>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-amber-800">Government Resources</h4>
            <div className="space-y-2">
              {govtLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-amber-700 hover:text-amber-900 transition-colors group"
                >
                  <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Language & Social */}
          <div className="space-y-4">
            <h4 className="font-bold text-amber-800">Connect & Language</h4>
            
            {/* Language Selector */}
            <div className="space-y-2">
              <span className="text-sm text-amber-700 font-medium">Choose Language:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <Globe size={16} className="mr-2" />
                    {languages.find(l => l.code === currentLanguage)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full border-amber-200">
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
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <span className="text-sm text-amber-700 font-medium">Follow Us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className={`${social.color} transition-all hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* App Download */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg border border-green-200">
              <p className="text-xs text-green-800 font-medium mb-2">📱 Download Farmo App</p>
              <div className="flex space-x-2">
                <Badge className="bg-green-600 text-white text-xs">Play Store</Badge>
                <Badge className="bg-gray-800 text-white text-xs">App Store</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-amber-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-amber-700">
              © {currentYear} Farmo. All rights reserved. | Made with 🌱 for sustainable farming.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-amber-700 hover:text-amber-900 transition-colors font-medium">
                Privacy Policy
              </a>
              <a href="#" className="text-amber-700 hover:text-amber-900 transition-colors font-medium">
                Terms of Service
              </a>
              <a href="#" className="text-amber-700 hover:text-amber-900 transition-colors font-medium">
                Support
              </a>
            </div>
          </div>
          
          {/* Additional Credits */}
          <div className="text-center mt-4 pt-4 border-t border-amber-200">
            <p className="text-xs text-amber-600">
              Supporting traditional farming wisdom since 2024 | Proudly serving farmers across India 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}