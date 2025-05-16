
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import OnboardingTooltip from '@/components/ui/OnboardingTooltip';
import { BookOpen, FileText, Video, VolumeX, Volume2 } from 'lucide-react';
import EducationCard from '@/components/shared/EducationCard';

const Parents = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Mock data
  const childProgress = [
    { subject: 'Mathematics', progress: 78, color: 'bg-edu-blue' },
    { subject: 'Science', progress: 65, color: 'bg-edu-green' },
    { subject: 'Language', progress: 92, color: 'bg-edu-orange' },
    { subject: 'Social Studies', progress: 45, color: 'bg-purple-500' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Completed "Addition and Subtraction" quiz', date: 'Today', score: '8/10' },
    { id: 2, activity: 'Read "The Water Cycle" story', date: 'Yesterday', score: null },
    { id: 3, activity: 'Practiced vocabulary game', date: '2 days ago', score: '15/20' },
  ];

  const areasOfImprovement = [
    { subject: 'Mathematics', topic: 'Division', suggestion: 'Practice with visual aids' },
    { subject: 'Science', topic: 'Plant Life Cycle', suggestion: 'Use real-world examples' },
  ];

  const conceptExplainers = [
    {
      title: 'Multiplication Made Easy',
      description: 'Visual techniques to teach multiplication tables',
      icon: <BookOpen className="h-8 w-8 text-edu-blue" />,
    },
    {
      title: 'Understanding Fractions',
      description: 'Simple explanations of fractions using everyday examples',
      icon: <FileText className="h-8 w-8 text-edu-blue" />,
    },
    {
      title: 'Reading Strategies',
      description: 'Methods to improve reading comprehension',
      icon: <BookOpen className="h-8 w-8 text-edu-blue" />,
    },
  ];

  const parentingVideos = [
    {
      title: 'Supporting Learning at Home',
      description: 'Simple activities to enhance your child\'s education',
      thumbnail: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: 'Building Study Habits',
      description: 'Help your child develop effective study routines',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60',
    },
    {
      title: 'Educational Activities for Weekends',
      description: 'Fun learning activities for the whole family',
      thumbnail: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <Layout>
      <section className="section-parent py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-nunito font-bold">Parents Section</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="relative"
              title={audioEnabled ? "Disable audio guidance" : "Enable audio guidance"}
            >
              {audioEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
              <OnboardingTooltip
                id="audio-guidance"
                title="Audio Guidance"
                content="Enable audio to hear explanations in your preferred language"
                position="left"
              />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto">
              <TabsTrigger value="dashboard" className="text-base md:text-lg py-3">
                Child's Dashboard
              </TabsTrigger>
              <TabsTrigger value="concepts" className="text-base md:text-lg py-3">
                Concept Explainers
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-base md:text-lg py-3">
                Parenting Videos
              </TabsTrigger>
            </TabsList>

            {/* Child's Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress Overview */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span>Subject Progress</span>
                      <OnboardingTooltip
                        id="progress-overview"
                        title="Progress Tracking"
                        content="This shows how your child is performing in different subjects"
                        position="right"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {childProgress.map((subject) => (
                        <div key={subject.subject} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{subject.subject}</span>
                            <span>{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className={subject.color} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="border-b pb-3 last:border-b-0">
                          <div className="font-medium">{activity.activity}</div>
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>{activity.date}</span>
                            {activity.score && <span className="font-medium text-edu-blue">{activity.score}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Areas Needing Attention */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span>Areas Needing Attention</span>
                    <OnboardingTooltip
                      id="areas-attention"
                      title="Focus Areas"
                      content="These are topics where your child might need extra support"
                      position="top"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {areasOfImprovement.map((area, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-edu-blue">{area.subject}: {area.topic}</div>
                        <div className="text-sm mt-1">Suggestion: {area.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Concept Explainers Tab */}
            <TabsContent value="concepts">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {conceptExplainers.map((concept, index) => (
                    <EducationCard
                      key={index}
                      title={concept.title}
                      description={concept.description}
                      icon={concept.icon}
                      onClick={() => alert(`Opening concept: ${concept.title}`)}
                    />
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Language Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Select your preferred language for audio explanations.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="border-2 border-edu-blue">English</Button>
                        <Button variant="outline">हिन्दी (Hindi)</Button>
                        <Button variant="outline">தமிழ் (Tamil)</Button>
                        <Button variant="outline">తెలుగు (Telugu)</Button>
                        <Button variant="outline">ಕನ್ನಡ (Kannada)</Button>
                        <Button variant="outline">বাংলা (Bengali)</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Parenting Videos Tab */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {parentingVideos.map((video, index) => (
                  <div key={index} className="edu-card overflow-hidden">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" className="rounded-full bg-white/80 hover:bg-white text-edu-blue">
                          <Video className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-nunito font-bold text-xl mb-2">{video.title}</h3>
                    <p className="text-gray-600">{video.description}</p>
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

export default Parents;
