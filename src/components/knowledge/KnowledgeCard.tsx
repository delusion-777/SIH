import React from 'react';
import { X, Lightbulb, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface KnowledgeCardProps {
  tip: {
    title: string;
    content: string;
    category: string;
  };
  onClose: () => void;
}

export function KnowledgeCard({ tip, onClose }: KnowledgeCardProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-4 border-amber-300 shadow-2xl max-w-md w-full relative overflow-hidden"
      >
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 text-white relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Lightbulb size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Did You Know?</h3>
              <p className="text-amber-100 text-sm">Knowledge Card Unlocked!</p>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-6">
          <div className="mb-4">
            <span className="inline-block bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {tip.category}
            </span>
          </div>
          
          <h4 className="text-xl font-bold text-amber-900 mb-3">
            {tip.title}
          </h4>
          
          <p className="text-amber-800 leading-relaxed mb-6">
            {tip.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-green-600">
              <Award size={20} />
              <span className="font-medium">+5 Farmo Coins</span>
            </div>
            
            <button
              onClick={onClose}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Got It!
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-300/20 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-orange-300/20 rounded-full"></div>
      </motion.div>
    </div>
  );
}