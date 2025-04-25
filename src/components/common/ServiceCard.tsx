import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  link: string;
  price?: string;
  featured?: boolean;
}

/**
 * ServiceCard component for displaying service offerings
 * - Can display with either an icon or image
 * - Supports featured styling for highlighting specific services
 * - Includes optional pricing display
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  image,
  link,
  price,
  featured = false,
}) => {
  return (
    <div className={`card h-full transition-transform duration-300 hover:-translate-y-2 ${
      featured ? 'border-2 border-accent ring-2 ring-accent/20' : ''
    }`}>
      {/* Card Image/Icon Area */}
      {image ? (
        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      ) : icon ? (
        <div className="flex justify-center pt-6">
          <div className="text-primary text-4xl">{icon}</div>
        </div>
      ) : null}
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-3 text-primary">
          {title}
          {featured && (
            <span className="ml-2 inline-block bg-accent text-primary text-xs px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Price & Link Area */}
        <div className="mt-4 flex items-center justify-between">
          {price && (
            <span className="text-lg font-semibold text-gray-800">
              {price}
            </span>
          )}
          <Link 
            to={link} 
            className="text-primary font-display font-semibold hover:text-accent transition-colors duration-200"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;