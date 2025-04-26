import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  link: string;
  price?: string;
  featured?: boolean;
  availableSeason?: 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Year-Round';
  isLaunched?: boolean;
  colorScheme?: 'primary' | 'secondary' | 'accent';
  specialOffer?: string;
}

/**
 * ServiceCard component for displaying service offerings
 * - Can display with either an icon or image
 * - Supports featured styling for highlighting specific services
 * - Includes optional pricing display
 * - Shows service availability by season
 * - Supports pre-launch indication
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  image,
  imageAlt,
  link,
  price,
  featured = false,
  availableSeason,
  isLaunched = false,
  colorScheme = 'primary',
  specialOffer,
}) => {
  const colorClasses = {
    primary: 'border-[#56772A] ring-[#56772A]/20 text-[#56772A]',
    secondary: 'border-[#6D8BA6] ring-[#6D8BA6]/20 text-[#6D8BA6]',
    accent: 'border-[#FBB13C] ring-[#FBB13C]/20 text-[#FBB13C]'
  };

  return (
    <div className={`card h-full transition-transform duration-300 hover:-translate-y-2 relative ${
      featured ? `border-2 ${colorClasses[colorScheme].split(' ')[0]} ring-2 ${colorClasses[colorScheme].split(' ')[1]}` : ''
    }`}>
      {/* Card Image/Icon Area */}
      {image ? (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          {specialOffer && (
            <div className="absolute top-3 left-3 bg-[#FBB13C] text-gray-900 text-xs px-3 py-1 rounded-full font-bold transform -rotate-3 z-10">
              {specialOffer}
            </div>
          )}
          
          {availableSeason && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full z-10">
              {availableSeason}
            </div>
          )}
          
          <img 
            src={image} 
            alt={imageAlt || `${title} service`} 
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>
      ) : icon ? (
        <div className="flex justify-center pt-6">
          <div className={`text-4xl ${colorClasses[colorScheme].split(' ')[2]}`}>{icon}</div>
        </div>
      ) : null}
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className={`text-xl font-display font-bold mb-3 ${colorClasses[colorScheme].split(' ')[2]}`}>
          {title}
          {featured && (
            <span className="ml-2 inline-block bg-[#FBB13C]/20 text-[#FBB13C] text-xs px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Price & Link Area */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            {price && (
              <span className="text-lg font-semibold text-gray-800">
                {price}
              </span>
            )}
            {!isLaunched && (
              <span className="block text-xs text-gray-500 mt-1">Available Spring 2025</span>
            )}
          </div>
          <Link 
            to={link} 
            className={`${colorClasses[colorScheme].split(' ')[2]} font-display font-semibold hover:opacity-80 transition-opacity duration-200`}
          >
            {isLaunched ? 'Learn More →' : 'Join Waitlist →'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;