import React from 'react';
import Hero from '../components/common/Hero';

/**
 * CommercialPage component
 * - Showcases commercial-specific services
 * - Includes industry-specific solutions
 * - Highlights commercial client benefits
 */
const CommercialPage: React.FC = () => {
  // Commercial services
  const services = [
    {
      id: 1,
      title: "Commercial Lawn Care",
      description: "Regular mowing, edging, and maintenance for business properties, HOAs, and multi-family residences.",
      image: "https://images.unsplash.com/photo-1566743896746-13698d0192f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "Custom Quote",
      featured: true
    },
    {
      id: 2,
      title: "Property Maintenance",
      description: "Complete exterior maintenance packages including landscaping, snow removal, and cleanup services.",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "Custom Quote"
    },
    {
      id: 3,
      title: "Seasonal Contracts",
      description: "Year-round property maintenance contracts with flexible scheduling and priority service.",
      image: "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "Custom Quote"
    },
    {
      id: 4,
      title: "Snow & Ice Management",
      description: "Reliable snow plowing, salting, and ice control for commercial properties throughout winter.",
      image: "https://images.unsplash.com/photo-1518994603110-1912b3272afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "Custom Quote"
    }
  ];

  return (
    <div>
      <Hero
        title="Commercial Property Maintenance"
        subtitle="Professional grounds maintenance services for businesses and property managers"
        backgroundImage="https://images.unsplash.com/photo-1566743896746-13698d0192f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
      {/* Add additional content here, such as services or industries */}
    </div>
  );
};

export default CommercialPage;
