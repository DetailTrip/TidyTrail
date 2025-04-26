import React from 'react';
import Hero from '../components/common/Hero';
import ServiceCard from '../components/common/ServiceCard';
import CTASection from '../components/common/CTASection';
import { Link } from 'react-router-dom';

/**
 * ServicesPage component
 * - Displays residential services offered by TidyTrails
 * - Lists service details and pricing
 * - Includes FAQs specific to residential services
 */
const ServicesPage: React.FC = () => {
  // Service data for residential customers - updated to match brand document services
  const services = [
    {
      id: 1,
      title: "Lawn Mowing & Maintenance",
      description: "Regular mowing, edging, and trimming to keep your lawn looking its best all season long.",
      image: "https://images.unsplash.com/photo-1589923188900-85f2413db5cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $50/visit",
      featured: true
    },
    {
      id: 2,
      title: "Pet Waste Cleanup",
      description: "Regular removal of pet waste to keep your yard clean, sanitary, and enjoyable for the whole family.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $24/visit",
      featured: true
    },
    {
      id: 3,
      title: "Spring Cleanup",
      description: "Comprehensive yard cleanup to prepare your property for the growing season after winter.",
      image: "https://images.unsplash.com/photo-1591443062886-006646d2db4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $150"
    },
    {
      id: 4,
      title: "Fall Cleanup",
      description: "Leaf removal, plant preparation, and yard cleanup for the winter months.",
      image: "https://images.unsplash.com/photo-1508895619071-9d58993a73f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $150"
    },
    {
      id: 5,
      title: "Patio & Furniture Cleaning",
      description: "Restore your outdoor living spaces with thorough cleaning of patios, decks, and outdoor furniture.",
      image: "https://images.unsplash.com/photo-1543996628-c7eba4cb9583?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $50"
    },
    {
      id: 6,
      title: "Snow Removal",
      description: "Reliable snow clearing services for driveways and walkways during the winter months.",
      image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $40/visit"
    }
  ];
  
  // Package data - added based on brand document
  const packages = [
    {
      title: "Fresh Start Combo",
      services: ["Debris removal", "Lawn mowing", "Furniture cleaning"],
      price: "From $140",
      featured: true,
      color: "bg-[#6D8BA6]"
    },
    {
      title: "Pet-Friendly Yard Package",
      services: ["Pet waste cleanup", "Raking", "Deodorizing"],
      price: "From $110",
      featured: true,
      color: "bg-[#56772A]"
    },
    {
      title: "Complete Spring Cleanup",
      services: ["Comprehensive cleanup", "Debris removal", "Initial mowing", "Furniture prep"],
      price: "Custom Quote",
      featured: false,
      color: "bg-[#6D8BA6]"
    }
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "How often should I have my lawn mowed?",
      answer: "For most residential lawns in Timmins, we recommend mowing once a week during the growing season (June-August). This may vary depending on weather conditions and your grass type."
    },
    {
      question: "What's included in your pet waste removal service?",
      answer: "Our pet waste removal includes thorough inspection of your yard, removal of all waste, proper disposal, and a brief service report. We offer weekly, bi-weekly, and one-time cleanup options."
    },
    {
      question: "Do I need to be home when you provide service?",
      answer: "No, you don't need to be home. Once we establish a schedule, our crew will arrive as planned. We can communicate via email or text for any special instructions."
    },
    {
      question: "What happens if it rains or snows on my scheduled service day?",
      answer: "If weather prevents us from servicing your property on the scheduled day, we'll automatically reschedule for the next available day and notify you of the change."
    },
    {
      question: "Do you offer seasonal contracts or pay-per-service options?",
      answer: "We offer both seasonal contracts and pay-per-service options. Seasonal contracts typically offer better value for regular maintenance throughout the season."
    },
    {
      question: "How do I prepare my yard before your first visit?",
      answer: "Before our first visit, please remove any valuable items or obstacles from your lawn. Mark any irrigation heads or other features you'd like us to avoid."
    }
  ];
  
  return (
    <>
      <Hero
        title="Residential Services"
        subtitle="Essential yard maintenance services for Timmins homeowners. Launching Spring 2025."
        backgroundImage="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />
      
      {/* Services Overview */}
      <section className="section bg-[#EEF9F3]">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Our Residential Services</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            TidyTrails offers essential yard maintenance services tailored to Timmins' unique seasonal needs. Choose individual services or our convenient service packages to keep your outdoor spaces looking their best year-round.
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
          
          <div className="text-center mt-8">
            <p className="text-gray-600 italic mb-4">All services available starting Spring 2025</p>
            <Link to="/contact" className="btn bg-[#56772A] hover:bg-[#48651F] text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Join Our Waitlist
            </Link>
          </div>
        </div>
      </section>
      
      {/* Service Packages */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Service Packages</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Save with our bundled service packages designed to provide comprehensive yard care at a better value.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl ${pkg.featured ? 'transform md:-translate-y-4' : ''}`}
              >
                <div className={`${pkg.color} text-white p-6`}>
                  <h3 className="font-display font-bold text-xl mb-1">{pkg.title}</h3>
                  <p className="text-white/90 font-bold text-2xl">{pkg.price}</p>
                </div>
                <div className="p-6 bg-white">
                  <ul className="mb-6 space-y-3">
                    {pkg.services.map((service, i) => (
                      <li key={i} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#56772A] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact" 
                    className="block text-center py-3 px-6 rounded-lg border-2 border-[#56772A] text-[#56772A] hover:bg-[#EEF9F3] font-bold transition duration-300"
                  >
                    Get Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="section bg-[#EEF9F3]">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Our Process</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We've designed a simple and efficient process to ensure you receive top-quality service with minimum hassle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-1 bg-[#56772A]/20 z-0"></div>
            
            {/* Steps */}
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-[#56772A] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Initial Consultation</h3>
              <p className="text-gray-600">We'll discuss your needs and assess your property.</p>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-[#56772A] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Custom Quote</h3>
              <p className="text-gray-600">You'll receive a detailed quote tailored to your property.</p>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-[#56772A] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Service Schedule</h3>
              <p className="text-gray-600">We'll set up a regular maintenance schedule that works for you.</p>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-[#56772A] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">We'll provide continuous care and adjustments as needed.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-[#FAFAFA]">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-6 bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="font-display font-semibold text-lg mb-2 text-[#56772A]">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Seasonal Notice - Based on current date */}
      <section className="bg-[#FBB13C]/10 py-10">
        <div className="container">
          <div className="rounded-xl bg-white border-2 border-[#FBB13C] p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <div className="bg-[#FBB13C]/20 p-3 rounded-full mb-4 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FBB13C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-[#56772A]">Planning for Spring 2025</h3>
                <p className="text-gray-600">Get ahead of the rush by joining our pre-launch waitlist</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Be proactive and secure your spot for our Spring 2025 launch. Early waitlist members will receive priority scheduling and special introductory pricing on our most popular services including post-winter cleanups and regular maintenance.
            </p>
            <Link to="/contact" className="btn bg-[#FBB13C] hover:bg-[#E9A029] text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300">
              Join the Priority List
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Reserve Your Spot for Spring 2025"
        subtitle="Join our waitlist today to secure priority scheduling when we launch."
        buttonText="Join Our Waitlist"
        buttonLink="/contact"
        backgroundClass="bg-[#6D8BA6]"
      />
    </>
  );
};

export default ServicesPage;