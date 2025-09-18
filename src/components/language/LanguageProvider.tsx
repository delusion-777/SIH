import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcome: "Welcome to Farmo",
    sustainableFarming: "Sustainable Farming",
    earnCoins: "Earn Coins",
    community: "Community",
    store: "Store",
    quiz: "Quiz",
    knowledge: "Knowledge Hub",
    events: "Events",
    home: "Home",
    profile: "Profile",
    missions: "Missions",
    achievements: "Achievements",
    // Add more translations as needed
  },
  ta: {
    welcome: "Farmo க்கு வரவேற்கிறோம்",
    sustainableFarming: "நிலையான விவசாயம்",
    earnCoins: "நாணயங்களைப் பெறுங்கள்",
    community: "சமுதாயம்",
    store: "கடை",
    quiz: "வினாடி வினா",
    knowledge: "அறிவு மையம்",
    events: "நிகழ்வுகள்",
    home: "முகப்பு",
    profile: "சுயவிவரம்",
    missions: "பணிகள்",
    achievements: "சாதனைகள்",
  },
  te: {
    welcome: "Farmo కి స్వాగతం",
    sustainableFarming: "స్థిరమైన వ్యవసాయం",
    earnCoins: "నాణేలు సంపాదించండి",
    community: "సమాజం",
    store: "దుకాణం",
    quiz: "క్విజ్",
    knowledge: "జ్ఞాన కేంద్రం",
    events: "ఈవెంట్లు",
    home: "హోమ్",
    profile: "ప్రొఫైల్",
    missions: "మిషన్లు",
    achievements: "అచీవ్మెంట్లు",
  },
  kn: {
    welcome: "Farmo ಗೆ ಸ್ವಾಗತ",
    sustainableFarming: "ಸುಸ್ಥಿರ ಕೃಷಿ",
    earnCoins: "ನಾಣ್ಯಗಳನ್ನು ಗಳಿಸಿ",
    community: "ಸಮುದಾಯ",
    store: "ಅಂಗಡಿ",
    quiz: "ಕ್ವಿಜ್",
    knowledge: "ಜ್ಞಾನ ಕೇಂದ್ರ",
    events: "ಘಟನೆಗಳು",
    home: "ಮನೆ",
    profile: "ಪ್ರೊಫೈಲ್",
    missions: "ಮಿಷನ್‌ಗಳು",
    achievements: "ಸಾಧನೆಗಳು",
  },
  ml: {
    welcome: "Farmo ലേക്ക് സ്വാഗതം",
    sustainableFarming: "സുസ്ഥിര കൃഷി",
    earnCoins: "നാണയങ്ങൾ നേടൂ",
    community: "കമ്മ്യൂണിറ്റി",
    store: "സ്റ്റോർ",
    quiz: "ക്വിസ്",
    knowledge: "വിജ്ഞാന കേന്ദ്രം",
    events: "ഇവന്റുകൾ",
    home: "ഹോം",
    profile: "പ്രൊഫൈൽ",
    missions: "മിഷനുകൾ",
    achievements: "നേട്ടങ്ങൾ",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}