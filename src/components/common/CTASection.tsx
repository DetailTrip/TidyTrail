import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  backgroundClass?: string;
}

/**
 * Call-to-Action section component
 * - Can be used with either a background image or color class
 * - Fully responsive
 * - Used to drive user actions like contacting or requesting quotes
 */
const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundClass = 'bg-primary',
}) => {
  const bgStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};
    
  return (
    <section 
      className={`py-16 ${!backgroundImage ? backgroundClass : 'bg-cover bg-center relative'}`}
      style={bgStyle}
    >
      {/* Overlay if using background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-primary/80"></div>
      )}
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {subtitle}
          </p>
          <Link 
            to={buttonLink} 
            className="btn bg-white text-primary hover:bg-accent hover:text-white"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;