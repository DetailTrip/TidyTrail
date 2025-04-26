import React from 'react';
import Hero from '../components/common/Hero';
import { Link } from 'react-router-dom';
import CTASection from '../components/common/CTASection';

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

  // Industries served
  const industries = [
    {
      title: "Property Management",
      icon: "building",
      description: "Comprehensive maintenance solutions for property managers with multiple locations."
    },
    {
      title: "Retail & Storefronts",
      icon: "storefront",
      description: "Create an inviting exterior that attracts customers to your business."
    },
    {
      title: "HOAs & Condominiums",
      icon: "homes",
      description: "Regular maintenance for common areas and shared outdoor spaces."
    },
    {
      title: "Office Parks",
      icon: "office",
      description: "Professional groundskeeping to reflect your business's attention to detail."
    }
  ];

  // Commercial benefits
  const benefits = [
    {
      title: "Customized Service Plans",
      description: "Services tailored to your specific property needs and budget constraints."
    },
    {
      title: "Reliable Scheduling",
      description: "Consistent service windows that won't interfere with your business operations."
    },
    {
      title: "Single Point of Contact",
      description: "A dedicated account manager for all your property maintenance needs."
    },
    {
      title: "Comprehensive Coverage",
      description: "From lawn care to snow removal, we handle all your exterior maintenance."
    },
    {
      title: "Flexible Contracts",
      description: "Monthly, seasonal, or annual agreements to match your budget cycle."
    },
    {
      title: "Professional Appearance",
      description: "Maintain a polished exterior that makes a positive impression on clients and visitors."
    }
  ];

  return (
    <>
      <Hero
        title="Commercial Property Maintenance"
        subtitle="Essential exterior maintenance for businesses and property managers. Launching Spring 2025."
        backgroundImage="https://images.unsplash.com/photo-1566743896746-13698d0192f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />
      
      {/* Commercial Services */}
      <section className="section bg-[#EEF9F3]">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Commercial Services</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            TidyTrails offers professional exterior maintenance services for commercial properties in Timmins. Our reliable service keeps your property looking its best while you focus on your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-display font-bold text-[#56772A]">{service.title}</h3>
                    <span className="bg-[#6D8BA6]/10 text-[#6D8BA6] text-sm font-bold py-1 px-2 rounded">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Available Spring 2025</span>
                    <Link 
                      to={service.link} 
                      className="text-[#56772A] hover:text-[#48651F] font-bold text-sm flex items-center"
                    >
                      Join Waitlist
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Industries Served */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Industries We Serve</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our commercial maintenance services are customized for various property types and business needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-[#EEF9F3] rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#56772A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {industry.icon === "building" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {industry.icon === "storefront" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                  {industry.icon === "homes" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {industry.icon === "office" && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#56772A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{industry.title}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="section bg-[#6D8BA6] text-white">
        <div className="container">
          <h2 className="section-title text-white">Why Choose TidyTrails for Your Business</h2>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
            We understand the unique needs of commercial properties in Timmins and provide reliable maintenance solutions tailored to your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-display font-semibold text-xl mb-3">{benefit.title}</h3>
                <p className="text-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Commercial Process */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Our Commercial Process</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            A simple, efficient process designed to meet your property maintenance needs.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#56772A]/20 -translate-x-1/2"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                    <h3 className="text-xl font-display font-semibold text-[#56772A] mb-2">1. Initial Assessment</h3>
                    <p className="text-gray-600">We'll evaluate your property to understand your specific maintenance needs.</p>
                  </div>
                  <div className="relative z-10 md:mx-auto bg-[#56772A] text-white w-10 h-10 rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:mt-0 mt-6"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1 mt-6 md:mt-0"></div>
                  <div className="relative z-10 md:mx-auto bg-[#56772A] text-white w-10 h-10 rounded-full flex items-center justify-center order-2 md:order-2">
                    2
                  </div>
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-3 md:order-3">
                    <h3 className="text-xl font-display font-semibold text-[#56772A] mb-2">2. Custom Proposal</h3>
                    <p className="text-gray-600">We'll develop a customized maintenance plan with transparent pricing.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                    <h3 className="text-xl font-display font-semibold text-[#56772A] mb-2">3. Service Agreement</h3>
                    <p className="text-gray-600">Flexible contracts tailored to your budget cycle and maintenance needs.</p>
                  </div>
                  <div className="relative z-10 md:mx-auto bg-[#56772A] text-white w-10 h-10 rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:mt-0 mt-6"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1 mt-6 md:mt-0"></div>
                  <div className="relative z-10 md:mx-auto bg-[#56772A] text-white w-10 h-10 rounded-full flex items-center justify-center order-2 md:order-2">
                    4
                  </div>
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-3 md:order-3">
                    <h3 className="text-xl font-display font-semibold text-[#56772A] mb-2">4. Ongoing Maintenance</h3>
                    <p className="text-gray-600">Regular service with quality checks and responsive support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Commercial Package Notice */}
      <section className="bg-[#FBB13C]/10 py-10">
        <div className="container">
          <div className="rounded-xl bg-white border-2 border-[#FBB13C] p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <div className="bg-[#FBB13C]/20 p-3 rounded-full mb-4 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FBB13C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-[#56772A]">Early Bird Commercial Registration</h3>
                <p className="text-gray-600">Limited spots available for our Spring 2025 launch</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              We're accepting a limited number of commercial clients for our initial launch. Early registrants will receive priority scheduling, preferred pricing, and a complimentary property assessment.
            </p>
            <Link to="/contact" className="btn bg-[#FBB13C] hover:bg-[#E9A029] text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 inline-block">
              Register Your Interest
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-[#FAFAFA]">
        <div className="container">
          <h2 className="section-title text-[#56772A]">Commercial FAQs</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-display font-semibold text-lg mb-2 text-[#56772A]">
                What size commercial properties do you service?
              </h3>
              <p className="text-gray-600">
                We service properties of various sizes in Timmins, from small storefronts to larger office complexes and multi-unit residential buildings. Our services are scalable to meet the needs of your specific property.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-display font-semibold text-lg mb-2 text-[#56772A]">
                How are commercial services priced?
              </h3>
              <p className="text-gray-600">
                Commercial services are priced based on property size, service frequency, and specific requirements. We provide detailed custom quotes after assessing your property's needs.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-display font-semibold text-lg mb-2 text-[#56772A]">
                Do you offer year-round maintenance contracts?
              </h3>
              <p className="text-gray-600">
                Yes, we offer annual maintenance contracts that include seasonal services appropriate for each time of year, including summer maintenance and winter snow removal.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-display font-semibold text-lg mb-2 text-[#56772A]">
                How do you handle special requests or emergency situations?
              </h3>
              <p className="text-gray-600">
                Commercial clients receive priority scheduling for special requests. When we launch, each client will have a dedicated contact for handling urgent needs and service adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Prepare Your Commercial Property"
        subtitle="Join our commercial client waitlist for priority service when we launch in Spring 2025."
        buttonText="Request Information"
        buttonLink="/contact"
        backgroundClass="bg-gradient-to-r from-[#56772A] to-[#6D8BA6]"
      />
    </>
  );
};

export default CommercialPage;
