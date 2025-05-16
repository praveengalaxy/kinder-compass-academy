
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Book, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import LoginModal from '../auth/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
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
          {profile?.role === 'parent' && (
            <Link to="/parents" className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors">
              Parents Section
            </Link>
          )}
          {profile?.role === 'student' && (
            <Link to="/children" className="font-nunito font-semibold text-edu-navy hover:text-edu-blue transition-colors">
              Children's Section
            </Link>
          )}
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>
                    {profile?.first_name || 'User'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {profile?.first_name} {profile?.last_name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {profile?.role === 'parent' ? 'Parent Account' : 'Student Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Add more menu items as needed */}
                <DropdownMenuItem onClick={() => signOut()} className="text-red-600 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className="btn-primary"
            >
              <User className="h-5 w-5 mr-2" />
              Log In
            </Button>
          )}
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
          
          {profile?.role === 'parent' && (
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
          )}
          
          {profile?.role === 'student' && (
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
          )}
          
          {isAuthenticated ? (
            <>
              <div className="p-2 border-t border-gray-200 pt-4">
                <div className="font-medium">{profile?.first_name} {profile?.last_name}</div>
                <div className="text-sm text-muted-foreground">
                  {profile?.role === 'parent' ? 'Parent Account' : 'Student Account'}
                </div>
              </div>
              <Button 
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="w-full flex items-center justify-center text-red-600"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => handleNavigate('/auth')}
              className="btn-primary w-full"
            >
              <User className="h-5 w-5 mr-2" />
              Log In
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
