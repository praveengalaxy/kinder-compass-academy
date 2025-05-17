import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Book, Award, Smile, Frown, Meh, BookOpen, Globe, BookText } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EducationCard from '@/components/shared/EducationCard';
import { Toggle } from '@/components/ui/toggle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChildProvider, useChild } from '@/contexts/ChildContext';

const ChildContent = () => {
  const { childId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { children, activeChild, setActiveChild } = useChild();
  
  const [activeTab, setActiveTab] = useState('learning');
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [moodFilter, setMoodFilter] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('1');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Find the child from the URL parameter
  useEffect(() => {
    if (childId && children.length > 0) {
      const child = children.find(c => c.id === childId);
      if (child) {
        setActiveChild(child);
      } else {
        toast({
          title: 'Child not found',
          description: 'The selected child could not be found.',
          variant: 'destructive'
        });
        navigate('/parents');
      }
    }
  }, [childId, children]);

  // Set the grade based on the active child
  useEffect(() => {
    if (activeChild?.grade_id) {
      setSelectedGrade(activeChild.grade_id.toString());
    }
  }, [activeChild]);

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

  // Subjects data
  const subjects = [
    { 
      id: 'maths',
      title: 'Maths', 
      description: 'Numbers, shapes, and problem solving', 
      icon: <Book className="h-8 w-8 text-white" />,
      color: 'bg-edu-blue'
    },
    { 
      id: 'science',
      title: 'Science', 
      description: 'Explore the natural world', 
      icon: <BookOpen className="h-8 w-8 text-white" />,
      color: 'bg-edu-green'
    },
    { 
      id: 'social',
      title: 'Social Science', 
      description: 'Learn about people and places', 
      icon: <Globe className="h-8 w-8 text-white" />,
      color: 'bg-edu-orange'
    },
    { 
      id: 'language',
      title: 'Regional Language', 
      description: 'Words, stories, and communication', 
      icon: <BookText className="h-8 w-8 text-white" />,
      color: 'bg-purple-500'
    }
  ];

  // Extra learning resources
  const extraResources = [
    {
      title: "Science Experiments",
      description: "Fun home experiments to learn scientific concepts",
      icon: <BookOpen className="h-6 w-6 text-white" />
    },
    {
      title: "Math Games",
      description: "Interactive games to practice math skills",
      icon: <Book className="h-6 w-6 text-white" />
    },
    {
      title: "Cultural Stories",
      description: "Learn about different cultures through stories",
      icon: <BookText className="h-6 w-6 text-white" />
    }
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

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No child selected</h2>
          <Button onClick={() => navigate('/parents')}>Go to Parents Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <section className="section-child py-6 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-nunito font-bold text-center mb-4">
          {activeChild.first_name}'s Learning Area
        </h1>
        
        {/* Grade Selection */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="grade-select" className="block text-lg font-nunito font-semibold mb-2">
              Select Your Grade:
            </label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-edu-blue">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grade 1</SelectItem>
                <SelectItem value="2">Grade 2</SelectItem>
                <SelectItem value="3">Grade 3</SelectItem>
                <SelectItem value="4">Grade 4</SelectItem>
                <SelectItem value="5">Grade 5</SelectItem>
                <SelectItem value="6">Grade 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto flex items-center justify-end gap-2">
            <span className="text-lg font-nunito font-semibold hidden sm:inline-block">Or browse by grade:</span>
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <Toggle
                  key={grade}
                  pressed={selectedGrade === grade.toString()}
                  onPressedChange={() => setSelectedGrade(grade.toString())}
                  className={`rounded-full min-w-[40px] h-10 ${
                    selectedGrade === grade.toString() 
                      ? 'bg-edu-blue text-white border-edu-blue' 
                      : 'bg-white border-edu-blue text-edu-blue'
                  }`}
                >
                  {grade}
                </Toggle>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-nunito font-bold mb-4">Choose a Subject</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <EducationCard
                key={subject.id}
                title={subject.title}
                description={subject.description}
                icon={<div className={`${subject.color} p-4 rounded-full`}>{subject.icon}</div>}
                className={`${selectedSubject === subject.id ? 'ring-2 ring-edu-blue ring-offset-2' : ''}`}
                onClick={() => setSelectedSubject(subject.id === selectedSubject ? null : subject.id)}
              />
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="learning" className="text-base md:text-lg py-3">
              Learning
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-base md:text-lg py-3">
              Fun Quizzes
            </TabsTrigger>
            <TabsTrigger value="stories" className="text-base md:text-lg py-3">
              Stories
            </TabsTrigger>
          </TabsList>

          {/* Learning Tab */}
          <TabsContent value="learning">
            <div className="max-w-3xl mx-auto">
              <Card className="border-4 border-edu-orange mb-8">
                <CardHeader className="bg-edu-orange/10">
                  <CardTitle className="text-2xl">
                    Grade {selectedGrade} {selectedSubject ? subjects.find(s => s.id === selectedSubject)?.title : 'Learning'}
                  </CardTitle>
                  <CardDescription className="text-lg font-nunito">
                    {selectedSubject 
                      ? `Explore ${subjects.find(s => s.id === selectedSubject)?.title} lessons for Grade ${selectedGrade}`
                      : 'Select a subject to begin learning'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {selectedSubject ? (
                    <div className="space-y-4">
                      <p className="text-lg">Ready to start learning? Click on a lesson below:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-auto p-4 text-left flex items-start">
                          <div className="mr-3 mt-1">
                            <div className={`${subjects.find(s => s.id === selectedSubject)?.color} p-2 rounded-full`}>
                              {subjects.find(s => s.id === selectedSubject)?.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold mb-1 text-lg">Lesson 1</h4>
                            <p className="text-sm text-gray-600">Introduction to {subjects.find(s => s.id === selectedSubject)?.title}</p>
                          </div>
                        </Button>
                        
                        <Button variant="outline" className="h-auto p-4 text-left flex items-start">
                          <div className="mr-3 mt-1">
                            <div className={`${subjects.find(s => s.id === selectedSubject)?.color} p-2 rounded-full`}>
                              {subjects.find(s => s.id === selectedSubject)?.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold mb-1 text-lg">Lesson 2</h4>
                            <p className="text-sm text-gray-600">Basic concepts for Grade {selectedGrade}</p>
                          </div>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-lg mb-4">Please select a subject from above to view lessons</p>
                      <Button 
                        onClick={() => setSelectedSubject('maths')}
                        className="bg-edu-blue hover:bg-edu-blue/80"
                      >
                        Start with Math
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learn More Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-nunito font-bold mb-4">Learn More</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Explore Extra Learning Resources</CardTitle>
                    <CardDescription>
                      Discover fun ways to learn beyond your regular lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Carousel
                      opts={{
                        align: "start",
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {extraResources.map((resource, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                              <Card className="border-2 border-edu-light-blue">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                  <div className="bg-edu-blue p-3 rounded-full mb-4">
                                    {resource.icon}
                                  </div>
                                  <h4 className="font-bold text-lg mb-2">{resource.title}</h4>
                                  <p className="text-sm text-gray-600">{resource.description}</p>
                                  <Button variant="outline" className="mt-4 w-full">Explore</Button>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-1" />
                      <CarouselNext className="right-1" />
                    </Carousel>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

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
  );
};

const Children = () => {
  return (
    <ChildProvider>
      <Layout>
        <ChildContent />
      </Layout>
    </ChildProvider>
  );
};

export default Children;
