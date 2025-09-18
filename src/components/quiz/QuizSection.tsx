import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Trophy, Award, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizSectionProps {
  farmoCoins: number;
  setFarmoCoins: (value: number | ((prev: number) => number)) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
}

export function QuizSection({ farmoCoins, setFarmoCoins }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [todayQuizzes, setTodayQuizzes] = useState(2);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which traditional Indian irrigation system stores rainwater for farming?",
      options: ["Tank irrigation", "Drip irrigation", "Sprinkler irrigation", "Flood irrigation"],
      correct: 0,
      explanation: "Tank irrigation systems have been used in India for centuries to collect and store rainwater during monsoons.",
      category: "Water Management",
      difficulty: "easy",
      reward: 10
    },
    {
      id: 2,
      question: "What is the main benefit of terrace farming?",
      options: ["Higher yield", "Prevents soil erosion", "Uses less water", "Grows crops faster"],
      correct: 1,
      explanation: "Terrace farming on slopes prevents soil erosion and maximizes agricultural land use in hilly areas.",
      category: "Soil Conservation",
      difficulty: "easy",
      reward: 10
    },
    {
      id: 3,
      question: "Which crop rotation practice naturally enriches soil with nitrogen?",
      options: ["Rice-Wheat", "Legumes-Cereals", "Cotton-Sugarcane", "Millet-Corn"],
      correct: 1,
      explanation: "Legumes fix nitrogen in the soil, making it available for subsequent cereal crops, reducing fertilizer needs.",
      category: "Sustainable Practices",
      difficulty: "medium",
      reward: 15
    },
    {
      id: 4,
      question: "What is Panchagavya used for in organic farming?",
      options: ["Soil testing", "Natural fertilizer", "Pest control", "Both B and C"],
      correct: 3,
      explanation: "Panchagavya is a traditional organic concoction used as both a natural fertilizer and bio-pesticide.",
      category: "Organic Farming",
      difficulty: "medium",
      reward: 15
    },
    {
      id: 5,
      question: "During which season do traditional Indian farmers prepare bunds and drainage?",
      options: ["Summer", "Pre-monsoon", "Post-monsoon", "Winter"],
      correct: 1,
      explanation: "Farmers prepare field bunds and drainage channels before monsoon season to manage water flow effectively.",
      category: "Weather Management",
      difficulty: "hard",
      reward: 20
    }
  ];

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleSubmitAnswer();
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startQuiz = () => {
    if (todayQuizzes <= 0) return;
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setQuizStarted(true);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    
    setTimerActive(false);
    setShowResult(true);
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    if (isCorrect) {
      const bonusMultiplier = Math.max(1, streak + 1);
      const coinsEarned = currentQuestion.reward * bonusMultiplier;
      setFarmoCoins(prev => prev + coinsEarned);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    setTodayQuizzes(prev => prev - 1);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimerActive(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!quizStarted) {
    return (
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <Trophy className="text-amber-600" size={24} />
            <span>Daily Quiz Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 p-3 rounded-xl text-center shadow-md">
                <div className="text-2xl font-bold text-blue-800">{todayQuizzes}</div>
                <div className="text-sm text-blue-600 font-medium">Quizzes Left</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 p-3 rounded-xl text-center shadow-md">
                <div className="text-2xl font-bold text-purple-800">{streak}</div>
                <div className="text-sm text-purple-600 font-medium">Streak</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 px-3 py-2 rounded-lg shadow-md">
              <Star className="text-yellow-500" size={16} />
              <span className="text-sm text-amber-700 font-medium">Earn up to 20 coins per quiz!</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 p-4 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="font-bold text-green-800 text-lg mb-1">Easy</div>
              <div className="text-green-600 font-medium">10-15 coins</div>
              <div className="text-xs text-green-500 mt-1">Perfect for beginners</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 p-4 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="font-bold text-yellow-800 text-lg mb-1">Medium</div>
              <div className="text-yellow-600 font-medium">15-20 coins</div>
              <div className="text-xs text-yellow-500 mt-1">Good challenge</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 p-4 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="font-bold text-red-800 text-lg mb-1">Hard</div>
              <div className="text-red-600 font-medium">20-25 coins</div>
              <div className="text-xs text-red-500 mt-1">Expert level</div>
            </div>
          </div>

          <Button 
            onClick={startQuiz}
            disabled={todayQuizzes <= 0}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {todayQuizzes > 0 ? '🚀 Start Quiz Challenge' : '⏰ Come Back Tomorrow'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <Trophy className="text-amber-600" size={24} />
            <span>Quiz Challenge</span>
          </CardTitle>
          
          <div className="flex items-center space-x-4">
            <Badge className={getDifficultyColor(currentQuestion?.difficulty || 'easy')}>
              {currentQuestion?.difficulty}
            </Badge>
            <div className="flex items-center space-x-2 text-amber-700">
              <Clock size={16} />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : ''}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {currentQuestion && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 p-6 rounded-xl shadow-lg">
                <p className="text-amber-900 font-bold text-lg mb-3 leading-relaxed">{currentQuestion.question}</p>
                <Badge variant="outline" className="text-sm text-amber-600 border-amber-300 bg-amber-50 px-3 py-1">
                  📚 {currentQuestion.category}
                </Badge>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentQuestion.correct
                            ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-500 text-green-800 shadow-green-200'
                            : 'bg-gradient-to-r from-red-100 to-red-200 border-red-500 text-red-800 shadow-red-200'
                          : 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-500 text-amber-800 shadow-amber-200'
                        : showResult && index === currentQuestion.correct
                          ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-500 text-green-800 shadow-green-200'
                          : 'bg-gradient-to-br from-white to-amber-50 border-amber-200 text-amber-800 hover:from-amber-100 hover:to-amber-150 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-base">{option}</span>
                      {showResult && (
                        selectedAnswer === index
                          ? index === currentQuestion.correct
                            ? <CheckCircle className="text-green-600" size={24} />
                            : <XCircle className="text-red-600" size={24} />
                          : index === currentQuestion.correct
                            ? <CheckCircle className="text-green-600" size={24} />
                            : null
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {selectedAnswer === currentQuestion.correct ? (
                      <>
                        <CheckCircle className="text-green-600" size={24} />
                        <span className="font-bold text-green-800 text-lg">🎉 Correct!</span>
                        <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 text-sm font-bold border border-green-300">
                          +{currentQuestion.reward * Math.max(1, streak)} coins
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-600" size={24} />
                        <span className="font-bold text-red-800 text-lg">❌ Incorrect</span>
                      </>
                    )}
                  </div>
                  <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <p className="text-amber-900 text-base font-medium leading-relaxed">💡 {currentQuestion.explanation}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex space-x-3 pt-6">
                {!showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    🎯 Submit Answer
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={resetQuiz}
                      variant="outline"
                      className="flex-1 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-bold py-3 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      📋 Back to Quizzes
                    </Button>
                    {todayQuizzes > 0 && (
                      <Button 
                        onClick={startQuiz}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        ⏭️ Next Quiz
                      </Button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}