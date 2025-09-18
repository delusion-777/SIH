import React, { useState } from 'react';
import { MessageCircle, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function FarmerGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Welcome to Farmo! I'm Ravi, your farming guide. Let's learn sustainable agriculture together!",
    "Complete daily missions to earn Farmo Coins and unlock new farming techniques.",
    "Did you know? Traditional crop rotation can increase soil fertility by 30%!",
    "Check out the store for eco-friendly farming tools and organic seeds.",
    "Join our community to share your farming experiences with others!"
  ];

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  return (
    <>
      {/* Floating Guide Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300"
      >
        <MessageCircle className="text-white" size={24} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Guide Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 text-white relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1724996854069-a7d335193ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdCUyMHRyYWRpdGlvbmFsJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU4MjAxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Farmer Ravi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Farmer Ravi</h3>
                    <p className="text-amber-100 text-sm">Your Farming Guide</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-6">
                <div className="bg-white rounded-xl p-4 mb-4 border border-amber-200 shadow-sm">
                  <p className="text-amber-900 leading-relaxed">
                    {messages[currentMessage]}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {messages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentMessage ? 'bg-amber-600' : 'bg-amber-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={nextMessage}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      Next Tip
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="border border-amber-300 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors text-sm font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-amber-100 p-4 border-t border-amber-200">
                <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  Quick Help
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <button className="text-amber-700 hover:text-amber-800 text-left">
                    • How to earn coins?
                  </button>
                  <button className="text-amber-700 hover:text-amber-800 text-left">
                    • Farm basics
                  </button>
                  <button className="text-amber-700 hover:text-amber-800 text-left">
                    • Quiz strategies
                  </button>
                  <button className="text-amber-700 hover:text-amber-800 text-left">
                    • Community rules
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}