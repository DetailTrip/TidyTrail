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
      price: "From $50",
      featured: true
    },
    {
      id: 2,
      title: "Pet Waste Cleanup",
      description: "Regular removal of pet waste to keep your yard clean, sanitary, and enjoyable for the whole family.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/services",
      price: "From $24/visit",
      featured: true
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
        subtitle="Creating beautiful outdoor spaces with essential yard maintenance services."
        backgroundImage="https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        buttonText="Join Our Waitlist"
        buttonLink="/contact"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/services"
        showPreLaunchBadge={true}
        launchDate="Spring 2025"
        overlayOpacity="medium"
      />
      
      {/* Services Section */}
      <section className="section bg-lightgreen">
        <div className="container">
          <h2 className="section-title text-primary">Our Services</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            From regular lawn maintenance to specialized pet waste removal, we offer essential yard services tailored to Timmins' seasonal needs.
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
                TidyTrails is launching in Timmins with a focus on essential yard maintenance services tailored to our local climate. We're committed to providing reliable, customizable services that keep your outdoor spaces looking their best, so you can enjoy more free time.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Dedicated Service</h3>
                    <p className="text-sm text-gray-600">Focused on quality and customer satisfaction</p>
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
                    <h3 className="font-display font-semibold mb-1">Pet-Friendly Focus</h3>
                    <p className="text-sm text-gray-600">Specialized pet waste removal services</p>
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
                alt="TidyTrails yard maintenance service"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#FBB13C] p-4 rounded-lg shadow-lg">
                <p className="text-primary font-display font-bold text-xl">Locally Owned</p>
                <p className="text-primary text-sm">Serving Timmins</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Replaced with Coming Soon */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-primary">Client Testimonials</h2>
          <div className="text-center max-w-3xl mx-auto p-8 border border-dashed border-primary/30 rounded-lg bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="font-display font-semibold text-xl mb-4">We're Just Getting Started</h3>
            <p className="text-gray-600 mb-6">
              We're excited to launch our services soon! Check back to see what our customers are saying about our work.
            </p>
            <p className="text-sm text-gray-500">
              Be one of our first customers and help us build this section with your feedback!
            </p>
          </div>
        </div>
      </section>

      {/* Pre-Launch Sign-Up Section */}
      <section className="section bg-[#EEF9F3]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title text-primary">Get Early Access</h2>
            <p className="text-gray-600 mb-8">
              We're preparing to launch in Spring 2025. Join our pre-launch list to receive special introductory pricing and priority scheduling when we open for business.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#56772A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold mb-2">Priority Scheduling</h3>
                <p className="text-sm text-gray-600">Get first access to our booking calendar</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#56772A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold mb-2">Special Pricing</h3>
                <p className="text-sm text-gray-600">Exclusive rates for early supporters</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#56772A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold mb-2">Launch Updates</h3>
                <p className="text-sm text-gray-600">Be the first to know when we go live</p>
              </div>
            </div>
            
            <Link to="/contact" className="btn bg-[#56772A] hover:bg-[#48651F] text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Join the Waitlist
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Be Ready for Spring 2025"
        subtitle="Join our waitlist today for priority access and special introductory pricing when we launch."
        buttonText="Join Our Waitlist"
        buttonLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1597857506137-c8c0f2ebf4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
    </>
  );
};

export default HomePage;