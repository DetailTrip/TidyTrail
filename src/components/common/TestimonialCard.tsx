import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title?: string;
  image?: string;
  rating?: number;
}

/**
 * TestimonialCard component for displaying customer reviews
 * - Includes star rating system
 * - Supports customer image
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  image,
  rating = 5,
}) => {
  return (
    <div className="card p-6 h-full">
      {/* Star Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={i < rating ? 'currentColor' : 'none'}
            stroke={i < rating ? 'none' : 'currentColor'}
            className={`w-5 h-5 ${i < rating ? 'text-accent' : 'text-gray-300'}`}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
            />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="mb-6">
        <p className="text-gray-600 italic">"{quote}"</p>
      </blockquote>
      
      {/* Customer Info */}
      <div className="flex items-center">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <p className="font-display font-bold text-primary">{name}</p>
          {title && <p className="text-sm text-gray-500">{title}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;