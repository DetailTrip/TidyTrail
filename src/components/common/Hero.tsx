import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Hero component for page headers
 * - Displays a background image with text overlay
 * - Configurable size, overlay darkness, and CTA button
 * - Responsive for all screen sizes
 */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink,
  overlay = true,
  size = 'large',
}) => {
  // Determine height based on size prop
  const heightClasses = {
    small: 'min-h-[30vh]',
    medium: 'min-h-[50vh]',
    large: 'min-h-[80vh]',
  };
  
  return (
    <div 
      className={`relative flex items-center justify-center ${heightClasses[size]} bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for better text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      
      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <h1 className="text-white text-3xl md:text-5xl font-display font-bold mb-4 animate-fade-in">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in animation-delay-200">
            {subtitle}
          </p>
        )}
        
        {buttonText && buttonLink && (
          <a 
            href={buttonLink}
            className="btn btn-primary text-lg animate-slide-up animation-delay-400"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Hero;