import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeBanner } from './components/home/HomeBanner';
import { InteractiveFarm } from './components/farm/InteractiveFarm';
import { CommunityHub } from './components/community/CommunityHub';
import { StoreItems } from './components/store/StoreItems';
import { KnowledgeHub } from './components/knowledge/KnowledgeHub';
import { QuizSection } from './components/quiz/QuizSection';
import { EventsSection } from './components/events/EventsSection';
import { KnowledgeCard } from './components/knowledge/KnowledgeCard';

import { LanguageProvider } from './components/language/LanguageProvider';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showKnowledgeCard, setShowKnowledgeCard] = useState(false);
  const [farmoCoins, setFarmoCoins] = useState(150);
  const [currentTip, setCurrentTip] = useState(0);
  
  const knowledgeTips = [
    {
      title: "Traditional Water Wisdom",
      content: "Ancient Indian farmers used tank irrigation systems to store rainwater during monsoons for year-round farming.",
      category: "Water Conservation"
    },
    {
      title: "Terrace Farming Innovation", 
      content: "Terrace farming was invented to stop soil erosion in hilly areas and maximize agricultural land use.",
      category: "Soil Conservation"
    },
    {
      title: "Crop Rotation Benefits",
      content: "Rotating legumes with cereals naturally enriches soil with nitrogen, reducing fertilizer needs.",
      category: "Sustainable Practices"
    },
    {
      title: "Organic Pest Control",
      content: "Neem oil and panchagavya have been used for centuries as natural pesticides in Indian agriculture.",
      category: "Natural Farming"
    },
    {
      title: "Monsoon Preparation",
      content: "Traditional farmers prepare fields with bunds and drainage channels before monsoon season.",
      category: "Weather Management"
    }
  ];

  // Show knowledge card every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowKnowledgeCard(true);
      setCurrentTip((prev) => (prev + 1) % knowledgeTips.length);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseKnowledgeCard = () => {
    setShowKnowledgeCard(false);
    setFarmoCoins(prev => prev + 5); // Reward for reading tip
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="space-y-8">
            <HomeBanner onNavigate={setCurrentSection} />
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InteractiveFarm />
                <div className="space-y-6">
                  <QuizSection farmoCoins={farmoCoins} setFarmoCoins={setFarmoCoins} />
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
                    <h3 className="mb-4 text-amber-800">Quick Access</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setCurrentSection('store')}
                        className="bg-amber-600 text-white px-4 py-3 rounded-xl hover:bg-amber-700 transition-colors"
                      >
                        Store
                      </button>
                      <button 
                        onClick={() => setCurrentSection('community')}
                        className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors"
                      >
                        Community
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'community':
        return <CommunityHub />;
      case 'store':
        return <StoreItems farmoCoins={farmoCoins} setFarmoCoins={setFarmoCoins} />;
      case 'knowledge':
        return <KnowledgeHub />;
      case 'quizzes':
        return <QuizSection farmoCoins={farmoCoins} setFarmoCoins={setFarmoCoins} />;
      case 'events':
        return <EventsSection />;
      default:
        return <HomeBanner onNavigate={setCurrentSection} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header 
          currentSection={currentSection} 
          onNavigate={setCurrentSection}
          farmoCoins={farmoCoins}
        />
        
        <main className="pb-16">
          {renderCurrentSection()}
        </main>

        <Footer />

        {/* Knowledge Card Popup */}
        {showKnowledgeCard && (
          <KnowledgeCard 
            tip={knowledgeTips[currentTip]}
            onClose={handleCloseKnowledgeCard}
          />
        )}


      </div>
    </LanguageProvider>
  );
}