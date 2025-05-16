
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface OnboardingTooltipProps {
  id: string;
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const OnboardingTooltip = ({ id, title, content, position = 'bottom' }: OnboardingTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if this tooltip has been shown before
    const tooltipShown = localStorage.getItem(`tooltip-${id}`);
    if (!tooltipShown) {
      // Show tooltip after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasBeenShown(true);
    }
  }, [id]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Mark this tooltip as shown in localStorage
    localStorage.setItem(`tooltip-${id}`, 'true');
    setHasBeenShown(true);
  };

  if (hasBeenShown) return null;

  const positionClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
  };

  return isVisible ? (
    <div className={`absolute z-50 ${positionClasses[position]} w-64 bg-edu-navy text-white p-4 rounded-lg shadow-lg animate-fade-in`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-nunito font-bold">{title}</h4>
        <button 
          onClick={handleDismiss}
          className="text-white hover:text-edu-orange"
          aria-label="Close tooltip"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm">{content}</p>
    </div>
  ) : null;
};

export default OnboardingTooltip;
