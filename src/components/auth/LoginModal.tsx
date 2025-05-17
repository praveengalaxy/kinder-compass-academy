
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const navigate = useNavigate();

  const handleNavigateToAuth = () => {
    onClose();
    navigate('/auth');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-nunito text-2xl">Welcome to EduConnect</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <p className="text-center text-muted-foreground">
            Please sign in or create a parent account to access all features and manage your children's education.
          </p>
          
          <Button 
            onClick={handleNavigateToAuth} 
            className="w-full btn-primary text-lg p-6"
          >
            Go to Login Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
