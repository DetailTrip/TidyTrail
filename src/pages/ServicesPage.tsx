import React from 'react';
import Hero from '../components/common/Hero';
import ServiceCard from '../components/common/ServiceCard';
import CTASection from '../components/common/CTASection';

/**
 * ServicesPage component
 * - Displays residential services offered by TidyTrails
 * - Lists service details and pricing
 * - Includes FAQs specific to residential services
 */
const ServicesPage: React.FC = () => {
  // Service data for residential customers
  const services = [
    {
      id: 1,
      title: "Lawn Mowing & Maintenance",
      description: "Regular mowing, edging, and trimming to keep your lawn looking its best all season long.",
      image: "https://images.unsplash.com/photo-1589923188900-85f2413db5cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $45/visit",
      featured: true
    },
    {
      id: 2,
      title: "Garden Maintenance",
      description: "Weeding, pruning, and plant care to keep your garden beds healthy and attractive.",
      image: "https://images.unsplash.com/photo-1599629954294-14df9f8291bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "From $60/hour"
    },
    {
      id: 3,
      title: "Spring Cleanup",
      description: "Comprehensive yard cleanup to prepare your property for the growing season.",
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
      title: "Mulch & Stone Installation",
      description: "Quality mulch or decorative stone installation for your garden beds and landscape areas.",
      image: "https://images.unsplash.com/photo-1621778455252-2a4d1a9b1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
      link: "/contact",
      price: "Custom Quote"
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
  
  // FAQ data
  const faqs = [
    {
      question: "How often should I have my lawn mowed?",
      answer: "For most residential lawns, we recommend mowing once a week during the growing season. This may vary depending on weather conditions and your grass type."
    },
    {
      question: "Do I need to be home when you provide service?",
      answer: "No, you don't need to be home. Once we establish a schedule, our crew will arrive as planned. We can communicate via email or text for any special instructions."
    },
    {
      question: "What happens if it rains on my scheduled service day?",
      answer: "If weather prevents us from servicing your property on the scheduled day, we'll automatically reschedule for the next available day and notify you of the change."
    },
    {
      question: "Do you offer seasonal contracts or pay-per-service options?",
      answer: "We offer both seasonal contracts and pay-per-service options. Seasonal contracts typically offer better value for regular maintenance throughout the season."
    },
    {
      question: "How do I prepare my yard before your first visit?",
      answer: "Before our first visit, please remove any obstacles from your lawn such as toys, pet waste, or debris. Mark any irrigation heads or other features you'd like us to avoid."
    }
  ];
  
  return (
    <>
      <Hero
        title="Residential Services"
        subtitle="Comprehensive yard maintenance services for homeowners in Timmins"
        backgroundImage="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        size="medium"
      />
      
      {/* Services Overview */}
      <section className="section bg-lightgreen">
        <div className="container">
          <h2 className="section-title text-primary">Our Residential Services</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We provide a full range of yard maintenance services to keep your residential property looking its best all year round. Whether you need regular maintenance or a one-time cleanup, our team is here to help.
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
        </div>
      </section>
      
      {/* Process Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title text-primary">Our Process</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We've designed a simple and efficient process to ensure you receive top-quality service with minimum hassle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-1 bg-gray-200 z-0"></div>
            
            {/* Steps */}
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Initial Consultation</h3>
              <p className="text-gray-600">We'll discuss your needs and assess your property.</p>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Custom Quote</h3>
              <p className="text-gray-600">You'll receive a detailed quote tailored to your property.</p>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Service Schedule</h3>
              <p className="text-gray-600">We'll set up a regular maintenance schedule that works for you.</p>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600">We'll provide continuous care and adjustments as needed.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title text-primary">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-6 bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="font-display font-semibold text-lg mb-2 text-primary">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact us today to schedule a free consultation and quote for your residential property."
        buttonText="Request a Quote"
        buttonLink="/contact"
        backgroundClass="bg-secondary"
      />
    </>
  );
};

export default ServicesPage;