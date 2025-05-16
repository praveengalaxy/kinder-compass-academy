
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Book, User, Menu, X } from 'lucide-react';
import LoginModal from '../auth/LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-edu-soft py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-edu-blue flex items-center justify-center">
            <Book className="h-6 w-6 text-white" />
          </div>
          <span className="font-nunito font-bold text-2xl text-edu-navy">EduConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors">
            Home
          </Link>
          <Link to="/parents" className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors">
            Parents Section
          </Link>
          <Link to="/children" className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors">
            Children's Section
          </Link>
          <div className="group relative">
            <Button 
              onClick={() => setIsLoginModalOpen(true)}
              className="btn-primary"
            >
              <User className="h-5 w-5 mr-2" />
              Log In
            </Button>
            <span className="tooltip top-full mt-2 left-1/2 transform -translate-x-1/2">
              Click to log in or create an account
            </span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-edu-navy p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-white flex flex-col space-y-4 animate-fade-in">
          <Link 
            to="/" 
            className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Home
            </div>
          </Link>
          <Link 
            to="/parents" 
            className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Parents Section
            </div>
          </Link>
          <Link 
            to="/children" 
            className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Children's Section
            </div>
          </Link>
          <Button 
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="btn-primary w-full"
          >
            <User className="h-5 w-5 mr-2" />
            Log In
          </Button>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Header;
