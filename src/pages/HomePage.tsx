import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/common/Hero';
import ServiceCard from '../components/common/ServiceCard';
import TestimonialCard from '../components/common/TestimonialCard';
import CTASection from '../components/common/CTASection';

/**
 * HomePage component
 * - Showcases main sections: hero, services, about, testimonials, and CTA
 * - Mobile-first responsive design with Tailwind
 */
const HomePage: React.FC = () => {
  // Service data for the service section
  const services = [
    {
      id: 1,
      title: "Lawn Mowing & Maintenance",
      description: "Regular mowing, edging, and trimming to keep your lawn looking its best all season long.",
      image: "https://images.unsplash.com/photo-1589923188900-85f2413db5cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/services",
      price: "From $45",
      featured: true
    },
    {
      id: 2,
      title: "Garden Maintenance",
      description: "Weeding, pruning, and plant care to keep your garden beds healthy and attractive.",
      image: "https://images.unsplash.com/photo-1599629954294-14df9f8291bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/services",
      price: "From $60"
    },
    {
      id: 3,
      title: "Commercial Services",
      description: "Complete property maintenance for businesses, HOAs, and commercial properties.",
      image: "https://images.unsplash.com/photo-1542223097-8de3de11da1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/commercial",
      price: "Custom Quote"
    },
  ];
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "TidyTrails transformed our overgrown backyard into a beautiful space we can enjoy with our family. Their attention to detail was impressive!",
      name: "Sarah Johnson",
      title: "Residential Customer",
      rating: 5
    },
    {
      id: 2,
      quote: "As a commercial property manager, I've worked with many landscapers. TidyTrails is by far the most reliable and professional team I've hired.",
      name: "Michael Thompson",
      title: "Property Manager",
      rating: 5
    },
    {
      id: 3,
      quote: "I've been using TidyTrails for seasonal cleanups for two years now. They're always on time, thorough, and leave my yard looking fantastic.",
      name: "Jennifer Mills",
      title: "Repeat Customer",
      rating: 4
    }
  ];
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Professional Yard Services in Timmins"
        subtitle="Creating and maintaining beautiful outdoor spaces for residential and commercial properties"
        backgroundImage="https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        buttonText="Get a Free Quote"
        buttonLink="/contact"
      />
      
      {/* Services Section */}
      <section className="section bg-lightgreen">
        <div className="container">
          <h2 className="section-title text-primary">Our Services</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            From regular lawn maintenance to complete yard transformations, our experienced team has you covered.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                link={service.link}
                price={service.price}
                featured={service.featured}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                Why Choose TidyTrails?
              </h2>
              <p className="text-gray-600 mb-6">
                Since 2020, TidyTrails has been providing exceptional yard maintenance services to Timmins and surrounding areas. Our dedicated team of professionals takes pride in creating and maintaining beautiful outdoor spaces for our clients.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Experienced Team</h3>
                    <p className="text-sm text-gray-600">Skilled professionals with years of experience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Reliable Service</h3>
                    <p className="text-sm text-gray-600">Consistent schedules you can count on</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Quality Equipment</h3>
                    <p className="text-sm text-gray-600">Commercial-grade tools for best results</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Satisfaction Guarantee</h3>
                    <p className="text-sm text-gray-600">We're not happy until you're happy</p>
                  </div>
                </div>
              </div>
              
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80" 
                alt="TidyTrails team member working on a garden"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent p-4 rounded-lg shadow-lg">
                <p className="text-primary font-display font-bold text-xl">5+ Years</p>
                <p className="text-primary text-sm">Serving Timmins</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-primary">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Outdoor Space?"
        subtitle="Contact us today for a free, no-obligation quote for your yard maintenance needs."
        buttonText="Get a Free Quote"
        buttonLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1597857506137-c8c0f2ebf4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
    </>
  );
};

export default HomePage;