
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-edu-navy text-white py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-nunito font-bold mb-4">EduConnect</h3>
            <p className="text-gray-300 mb-4">
              Connecting parents and children through engaging educational content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-edu-orange transition-colors">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-edu-orange transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-edu-orange transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-nunito font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/parents" className="text-gray-300 hover:text-white transition-colors">Parents Section</Link>
              </li>
              <li>
                <Link to="/children" className="text-gray-300 hover:text-white transition-colors">Children's Section</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-nunito font-bold mb-4">Language Support</h3>
            <p className="text-gray-300 mb-4">
              Content available in multiple regional languages to support diverse learning needs.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-edu-blue/20 text-white px-3 py-1 rounded-full text-sm">English</span>
              <span className="bg-edu-blue/20 text-white px-3 py-1 rounded-full text-sm">Hindi</span>
              <span className="bg-edu-blue/20 text-white px-3 py-1 rounded-full text-sm">Tamil</span>
              <span className="bg-edu-blue/20 text-white px-3 py-1 rounded-full text-sm">Telugu</span>
              <span className="bg-edu-blue/20 text-white px-3 py-1 rounded-full text-sm">Kannada</span>
              <span className="bg-edu-blue/20 text-white px-3 py-1 rounded-full text-sm">Bengali</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 EduConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
