
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    toast({
      title: 'Welcome back!',
      description: 'You have successfully logged in.',
    });
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup success
    toast({
      title: 'Account created!',
      description: 'Your account has been created successfully.',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-nunito text-2xl">Welcome to EduConnect</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-lg p-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-lg p-6"
                />
              </div>
              <Button type="submit" className="w-full btn-primary text-lg p-6">
                Login
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Forgot your password?{" "}
                <button
                  type="button" 
                  className="text-edu-blue hover:underline"
                  onClick={() => toast({ title: "Password Reset", description: "Check your email for reset instructions." })}
                >
                  Reset Here
                </button>
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="text-lg p-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-lg p-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-lg p-6"
                />
              </div>
              <Button type="submit" className="w-full btn-primary text-lg p-6">
                Create Account
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                By creating an account, you agree to our{" "}
                <button
                  type="button" 
                  className="text-edu-blue hover:underline"
                  onClick={() => toast({ title: "Terms", description: "Our terms and conditions apply." })}
                >
                  Terms of Service
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
