import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  overlay?: boolean;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center';
  showPreLaunchBadge?: boolean;
  launchDate?: string;
}

/**
 * Hero component for page headers
 * - Displays a background image with text overlay
 * - Configurable size, overlay darkness, and CTA button
 * - Responsive for all screen sizes
 * - Supports pre-launch messaging
 */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  overlay = true,
  overlayOpacity = 'medium',
  size = 'large',
  align = 'center',
  showPreLaunchBadge = false,
  launchDate,
}) => {
  // Determine height based on size prop
  const heightClasses = {
    small: 'min-h-[30vh]',
    medium: 'min-h-[50vh]',
    large: 'min-h-[80vh]',
  };
  
  const opacityClasses = {
    light: 'opacity-30',
    medium: 'opacity-50',
    dark: 'opacity-70',
  };
  
  return (
    <div 
      className={`relative flex items-center justify-center ${heightClasses[size]} bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for better text readability */}
      {overlay && (
        <div className={`absolute inset-0 bg-black ${opacityClasses[overlayOpacity]}`}></div>
      )}
      
      {/* Content */}
      <div className={`container relative z-10 ${align === 'left' ? 'text-left md:pl-12' : 'text-center'} px-4 py-20`}>
        {showPreLaunchBadge && (
          <div className={`bg-[#FBB13C] text-gray-900 px-4 py-2 rounded-lg font-bold ${align === 'left' ? 'inline-block' : 'mx-auto inline-block'} mb-6 animate-fade-in`}>
            {launchDate ? `Launching ${launchDate}` : 'Coming Soon'}
          </div>
        )}
        
        <h1 className="text-white text-3xl md:text-5xl font-display font-bold mb-4 animate-fade-in">
          {title}
        </h1>
        
        {subtitle && (
          <p className={`text-white text-lg md:text-xl ${align === 'left' ? 'max-w-3xl' : 'max-w-3xl mx-auto'} mb-8 animate-fade-in animation-delay-200`}>
            {subtitle}
          </p>
        )}
        
        <div className={`flex flex-wrap ${align === 'left' ? 'justify-start' : 'justify-center'} gap-4`}>
          {buttonText && buttonLink && (
            buttonLink.startsWith('http') ? (
              <a 
                href={buttonLink}
                className="btn bg-[#56772A] hover:bg-[#48651F] text-white text-lg animate-slide-up animation-delay-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                {buttonText}
              </a>
            ) : (
              <Link 
                to={buttonLink}
                className="btn bg-[#56772A] hover:bg-[#48651F] text-white text-lg animate-slide-up animation-delay-400"
              >
                {buttonText}
              </Link>
            )
          )}
          
          {secondaryButtonText && secondaryButtonLink && (
            secondaryButtonLink.startsWith('http') ? (
              <a 
                href={secondaryButtonLink}
                className="btn bg-transparent hover:bg-white/20 text-white border-2 border-white text-lg animate-slide-up animation-delay-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryButtonText}
              </a>
            ) : (
              <Link 
                to={secondaryButtonLink}
                className="btn bg-transparent hover:bg-white/20 text-white border-2 border-white text-lg animate-slide-up animation-delay-500"
              >
                {secondaryButtonText}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;