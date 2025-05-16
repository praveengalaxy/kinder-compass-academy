
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Book, User } from 'lucide-react';
import EducationCard from '@/components/shared/EducationCard';
import OnboardingTooltip from '@/components/ui/OnboardingTooltip';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const [tooltipShown, setTooltipShown] = useState(false);
  const { isAuthenticated, profile } = useAuth();

  // Helper function to determine appropriate section based on user role
  const goToRoleSection = () => {
    if (profile?.role === 'parent') {
      navigate('/parents');
    } else if (profile?.role === 'student') {
      navigate('/children');
    } else {
      // If not logged in, go to auth page
      navigate('/auth');
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-edu-light-blue to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-nunito font-bold text-edu-navy mb-6">
            Learning Together, Growing Together
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            A family-friendly platform connecting parents and children through engaging educational content
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
            {isAuthenticated ? (
              <Button 
                onClick={goToRoleSection} 
                className="btn-primary text-lg px-8 py-6 w-full sm:w-auto"
              >
                {profile?.role === 'parent' ? (
                  <>
                    <User className="mr-2 h-5 w-5" />
                    Go to Parents Section
                  </>
                ) : (
                  <>
                    <Book className="mr-2 h-5 w-5" />
                    Go to Children's Section
                  </>
                )}
              </Button>
            ) : (
              <>
                <div className="relative">
                  <Button 
                    onClick={() => navigate('/auth')} 
                    className="btn-primary text-lg px-8 py-6 w-full sm:w-auto"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Get Started
                  </Button>
                  <OnboardingTooltip 
                    id="login-signup"
                    title="Join EduConnect"
                    content="Create an account to access all learning resources"
                    position="bottom"
                  />
                </div>
                <div className="relative">
                  <Button 
                    onClick={() => navigate('/auth')} 
                    className="btn-secondary text-lg px-8 py-6 w-full sm:w-auto"
                    variant="outline"
                  >
                    <Book className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-nunito font-bold text-center mb-12">How EduConnect Helps Families Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EducationCard
              title="AI-Powered Learning"
              description="Personalized educational content that adapts to your child's learning style and pace"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>}
            />
            <EducationCard
              title="Regional Language Support"
              description="Content available in multiple languages to make learning accessible to everyone"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>}
            />
            <EducationCard
              title="Gamified Learning"
              description="Fun quizzes, badges, and interactive stories that make education engaging"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6.5"/><path d="M16.25 6H12v6.5"/><path d="M9.5 14c1.33 1 3 1.5 4.5 1.5 1 0 3-.17 4.5-1.5"/><path d="M9.5 14c-1 .75-2.67 1-4 1-1.5 0-3-.5-4.52-1.5"/><path d="M9.5 6c-1 .75-2.67 1-4 1-1.5 0-3-.5-4.5-1.5"/><path d="M9.5 22V6"/><path d="M22 14v4a2 2 0 0 1-2 2h-4"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-nunito font-bold text-center mb-12">What Families Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-edu-orange flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-nunito font-bold">Meena R.</h4>
                  <p className="text-sm text-gray-500">Parent of two</p>
                </div>
              </div>
              <p className="text-gray-700">
                "EduConnect has transformed how my children learn. The regional language support means I can help them even when concepts are complex."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-edu-blue flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-nunito font-bold">Rahul T.</h4>
                  <p className="text-sm text-gray-500">Father</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The progress tracking helps me understand where my child needs more support. The gamified learning keeps them engaged for hours!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-nunito font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of families who are making education a fun and collaborative experience.
          </p>
          {isAuthenticated ? (
            <Button 
              onClick={goToRoleSection} 
              className="btn-primary text-lg px-10 py-6"
            >
              Go to {profile?.role === 'parent' ? 'Parent' : 'Learning'} Dashboard
            </Button>
          ) : (
            <Button 
              onClick={() => navigate('/auth')} 
              className="btn-primary text-lg px-10 py-6"
            >
              Sign Up Today
            </Button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
