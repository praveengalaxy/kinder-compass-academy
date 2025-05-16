
import React from 'react';

interface EducationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const EducationCard = ({ title, description, icon, className = '', onClick }: EducationCardProps) => {
  return (
    <div 
      className={`edu-card group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-edu-light-blue p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-nunito font-bold text-xl mb-2 text-edu-navy group-hover:text-edu-blue transition-colors">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default EducationCard;
