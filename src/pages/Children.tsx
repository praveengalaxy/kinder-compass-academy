
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Book, Award, Smile, Frown, Meh } from 'lucide-react';

const Children = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [moodFilter, setMoodFilter] = useState<string | null>(null);

  // Mock quiz data
  const quizQuestions = [
    {
      question: "What makes plants grow?",
      options: ["Water only", "Sunshine only", "Water and sunshine", "Soil only"],
      correctAnswer: 2,
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=60",
    },
    {
      question: "How many days are in a week?",
      options: ["5 days", "6 days", "7 days", "8 days"],
      correctAnswer: 2,
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60",
    },
    {
      question: "What animal says 'meow'?",
      options: ["Dog", "Cat", "Bird", "Fish"],
      correctAnswer: 1,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=60",
    },
  ];

  // Mock story data
  const stories = [
    {
      id: 1,
      title: "The Clever Rabbit",
      description: "A story about a rabbit that outsmarts a fox",
      thumbnail: "https://images.unsplash.com/photo-1540112097474-254acbf58376?w=800&auto=format&fit=crop&q=60",
      mood: "happy",
      moral: "Wisdom beats strength",
      age: "6-8",
    },
    {
      id: 2,
      title: "The Kind Elephant",
      description: "An elephant helps forest animals during a drought",
      thumbnail: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop&q=60",
      mood: "happy",
      moral: "Helping others",
      age: "4-7",
    },
    {
      id: 3,
      title: "The Lost Puppy",
      description: "A puppy finds its way home with help from friends",
      thumbnail: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=60",
      mood: "sad",
      moral: "Friendship",
      age: "5-8",
    },
    {
      id: 4,
      title: "The Magic Seed",
      description: "A tiny seed grows into something wonderful",
      thumbnail: "https://images.unsplash.com/photo-1631696018922-36831052b261?w=800&auto=format&fit=crop&q=60",
      mood: "calm",
      moral: "Patience",
      age: "4-6",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === quizQuestions[currentQuizQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      // Play success sound effect
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-instant-win-2021.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Quiz finished
      alert(`Quiz completed! Your score: ${score}/${quizQuestions.length}`);
      // Reset quiz
      setCurrentQuizQuestion(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setScore(0);
    }
  };

  const filteredStories = moodFilter 
    ? stories.filter(story => story.mood === moodFilter) 
    : stories;

  return (
    <Layout>
      <section className="section-child py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-nunito font-bold text-center mb-8">Children's Learning Area</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="quiz" className="text-base md:text-lg py-3">
                Fun Quizzes
              </TabsTrigger>
              <TabsTrigger value="stories" className="text-base md:text-lg py-3">
                Interactive Stories
              </TabsTrigger>
            </TabsList>

            {/* Quiz Tab */}
            <TabsContent value="quiz">
              <div className="max-w-3xl mx-auto">
                <Card className="border-4 border-edu-orange">
                  <CardHeader className="bg-edu-orange/10">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl">Question {currentQuizQuestion + 1}/{quizQuestions.length}</CardTitle>
                      <div className="flex items-center">
                        <span className="font-bold mr-2">Score:</span>
                        <Badge variant="outline" className="bg-edu-blue text-white text-lg px-3 py-1">
                          {score}/{quizQuestions.length}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-xl font-nunito font-semibold mt-2">
                      {quizQuestions[currentQuizQuestion].question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <img 
                        src={quizQuestions[currentQuizQuestion].image} 
                        alt="Quiz question" 
                        className="w-full h-64 object-cover rounded-lg" 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full text-left p-4 rounded-lg text-lg font-nunito font-medium transition-all ${
                            selectedAnswer === index 
                              ? (index === quizQuestions[currentQuizQuestion].correctAnswer 
                                ? 'bg-green-100 border-2 border-green-500' 
                                : 'bg-red-100 border-2 border-red-500')
                              : 'bg-white border-2 border-gray-200 hover:border-edu-blue'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {selectedAnswer === index && index === quizQuestions[currentQuizQuestion].correctAnswer && (
                              <Check className="h-6 w-6 text-green-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mt-6">
                        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                          <p className="text-lg font-nunito font-semibold">
                            {isCorrect ? 'Correct! Well done! 🎉' : 'Try again! The correct answer is highlighted above.'}
                          </p>
                        </div>
                        <Button 
                          onClick={handleNextQuestion} 
                          className="w-full py-6 text-lg btn-primary"
                        >
                          Next Question
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Badges Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-nunito font-bold mb-4">Your Badges</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                      <span className="text-sm">Math Star</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-edu-blue to-blue-600 rounded-full flex items-center justify-center mb-2">
                        <Book className="h-10 w-10 text-white" />
                      </div>
                      <span className="text-sm">Reading Pro</span>
                    </div>
                    <div className="flex flex-col items-center opacity-40">
                      <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                        <Award className="h-10 w-10 text-gray-500" />
                      </div>
                      <span className="text-sm">Science Badge</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories">
              <div className="mb-6">
                <h3 className="text-xl font-nunito font-bold mb-4">How are you feeling today?</h3>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button 
                    variant="outline" 
                    className={`rounded-full px-6 py-6 flex items-center ${moodFilter === 'happy' ? 'bg-edu-orange/20 border-edu-orange' : ''}`}
                    onClick={() => setMoodFilter(moodFilter === 'happy' ? null : 'happy')}
                  >
                    <Smile className="h-6 w-6 mr-2 text-edu-orange" />
                    Happy
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`rounded-full px-6 py-6 flex items-center ${moodFilter === 'sad' ? 'bg-edu-blue/20 border-edu-blue' : ''}`}
                    onClick={() => setMoodFilter(moodFilter === 'sad' ? null : 'sad')}
                  >
                    <Frown className="h-6 w-6 mr-2 text-edu-blue" />
                    Sad
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`rounded-full px-6 py-6 flex items-center ${moodFilter === 'calm' ? 'bg-edu-green/20 border-edu-green' : ''}`}
                    onClick={() => setMoodFilter(moodFilter === 'calm' ? null : 'calm')}
                  >
                    <Meh className="h-6 w-6 mr-2 text-edu-green" />
                    Calm
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <div key={story.id} className="edu-card group overflow-hidden">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={story.thumbnail} 
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-nunito font-bold text-xl mb-2 group-hover:text-edu-orange transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="bg-edu-light-blue text-edu-blue">
                        Age: {story.age}
                      </Badge>
                      <Badge variant="secondary" className="bg-edu-peach text-edu-orange">
                        Mood: {story.mood}
                      </Badge>
                      <Badge variant="secondary" className="bg-edu-purple text-purple-700">
                        Moral: {story.moral}
                      </Badge>
                    </div>
                    <Button variant="outline" className="w-full">Read Story</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Children;
