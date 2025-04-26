import React, { useState } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import PriceDisplay from '../atoms/PriceDisplay';

const CommercialInquiry: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { contact } = state;
  
  const [formState, setFormState] = useState({
    businessName: '',
    contactName: contact.firstName ? `${contact.firstName} ${contact.lastName}` : '',
    email: contact.email || '',
    phone: contact.phone || '',
    propertyAddress: '',
    propertyType: 'office', // Default property type
    propertySize: '',
    serviceNeeds: [] as string[],
    frequency: 'weekly',
    additionalDetails: '',
    preferredContactMethod: 'email'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Property type options
  const propertyTypes = [
    { id: 'office', label: 'Office Building' },
    { id: 'retail', label: 'Retail Space' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'industrial', label: 'Industrial Property' },
    { id: 'apartment', label: 'Apartment Complex' },
    { id: 'hotel', label: 'Hotel/Motel' },
    { id: 'medical', label: 'Medical Facility' },
    { id: 'school', label: 'School/Educational' },
    { id: 'other', label: 'Other Commercial' }
  ];
  
  // Service needs options
  const serviceOptions = [
    { id: 'lawn-mowing', label: 'Lawn Mowing' },
    { id: 'landscaping', label: 'Landscaping Services' },
    { id: 'seasonal-cleanup', label: 'Seasonal Cleanup' },
    { id: 'snow-removal', label: 'Snow Removal (Winter)' },
    { id: 'parking-lot', label: 'Parking Lot Maintenance' },
    { id: 'pest-control', label: 'Outdoor Pest Control' },
    { id: 'irrigation', label: 'Irrigation/Sprinkler Services' },
    { id: 'tree-services', label: 'Tree Trimming/Removal' }
  ];
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox changes for service needs
  const handleServiceChange = (serviceId: string) => {
    setFormState(prev => {
      const currentServices = [...prev.serviceNeeds];
      
      if (currentServices.includes(serviceId)) {
        return {
          ...prev,
          serviceNeeds: currentServices.filter(id => id !== serviceId)
        };
      } else {
        return {
          ...prev,
          serviceNeeds: [...currentServices, serviceId]
        };
      }
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formState.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required for commercial inquiries';
    }
    
    if (!formState.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Property address is required';
    }
    
    if (!formState.propertySize.trim()) {
      newErrors.propertySize = 'Property size is required';
    }
    
    if (formState.serviceNeeds.length === 0) {
      newErrors.serviceNeeds = 'Please select at least one service need';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Update contact info in the global state
        dispatch({
          type: 'UPDATE_CONTACT',
          payload: {
            firstName: formState.contactName.split(' ')[0] || '',
            lastName: formState.contactName.split(' ').slice(1).join(' ') || '',
            email: formState.email,
            phone: formState.phone,
            neighborhood: formState.propertyAddress.split(',').pop()?.trim() || '',
            message: `Business: ${formState.businessName}\nProperty Type: ${
              propertyTypes.find(t => t.id === formState.propertyType)?.label
            }\nProperty Size: ${formState.propertySize}\nServices: ${
              formState.serviceNeeds.map(s => serviceOptions.find(o => o.id === s)?.label).join(', ')
            }\nFrequency: ${formState.frequency}\nAdditional Details: ${formState.additionalDetails}`,
            contactTime: ['Business Hours']
          }
        });
      }, 1500);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
        
        <div className="max-w-lg mx-auto mb-8">
          <p className="text-gray-600 mb-6">
            We've received your commercial service inquiry for <strong>{formState.businessName}</strong>. 
            Our commercial services team will review your needs and contact you within 1-2 business days 
            to discuss a customized service plan and provide a detailed quote.
          </p>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Services Requested</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {formState.serviceNeeds.map(serviceId => (
                <li key={serviceId} className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {serviceOptions.find(s => s.id === serviceId)?.label}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg mb-6 text-sm text-gray-700">
            <p className="font-medium mb-2">What to expect next:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Our commercial team will review your inquiry</li>
              <li>We'll contact you via {formState.preferredContactMethod} within 1-2 business days</li>
              <li>We'll schedule an on-site assessment if needed</li>
              <li>You'll receive a detailed, customized quote</li>
            </ol>
          </div>
          
          <p className="text-sm text-gray-500">
            Reference #: COM-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(`TidyTrails Commercial Inquiry - ${formState.businessName}`);
              alert('Reference copied to clipboard!');
            }}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Reference
          </button>
          
          <button
            onClick={() => dispatch({ type: 'RESET_CALCULATOR' })}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Return to Calculator
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Commercial Property Inquiry</h2>
      <p className="text-gray-600 mb-8">
        Commercial properties require customized service plans. Please provide the details below, 
        and our commercial team will contact you with a tailored quote.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formState.businessName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.businessName && (
              <p id="businessName-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.businessName}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Name *
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formState.contactName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.contactName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="First and Last Name"
            />
            {errors.contactName && (
              <p id="contactName-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.contactName}
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="(705) 123-4567"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Property Address in Timmins *
          </label>
          <input
            type="text"
            id="propertyAddress"
            name="propertyAddress"
            value={formState.propertyAddress}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.propertyAddress ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Street Address, City, Postal Code"
          />
          {errors.propertyAddress && (
            <p id="propertyAddress-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.propertyAddress}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formState.propertyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              {propertyTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-1">
              Property Size (approx. sq ft) *
            </label>
            <input
              type="text"
              id="propertySize"
              name="propertySize"
              value={formState.propertySize}
              onChange={handleChange}
              placeholder="e.g., 5,000"
              className={`w-full p-2 border rounded-md ${errors.propertySize ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.propertySize && (
              <p id="propertySize-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.propertySize}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Service Needs *
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
              {serviceOptions.map(service => (
                <div key={service.id} className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id={`service-${service.id}`}
                      name="serviceNeeds"
                      type="checkbox"
                      checked={formState.serviceNeeds.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={`service-${service.id}`} className="text-gray-700">
                      {service.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {errors.serviceNeeds && (
              <p id="serviceNeeds-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.serviceNeeds}
              </p>
            )}
          </fieldset>
        </div>
        
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Service Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            value={formState.frequency}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom/Seasonal</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            value={formState.additionalDetails}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Please provide any specific requirements or questions you have about our commercial services."
          ></textarea>
        </div>
        
        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </legend>
            <div className="flex space-x-6">
              <div className="flex items-center">
                <input
                  id="contact-email"
                  name="preferredContactMethod"
                  type="radio"
                  value="email"
                  checked={formState.preferredContactMethod === 'email'}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="contact-email" className="ml-2 block text-sm text-gray-700">
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="contact-phone"
                  name="preferredContactMethod"
                  type="radio"
                  value="phone"
                  checked={formState.preferredContactMethod === 'phone'}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="contact-phone" className="ml-2 block text-sm text-gray-700">
                  Phone
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start mb-4">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I understand that this is an inquiry and not a binding contract. TidyTrails will contact me with a custom quote.
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
              isSubmitting ? 'bg-primary/70 cursor-wait' : 'bg-primary hover:bg-primary-dark'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Commercial Inquiry'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Our Commercial Services</h3>
        <p className="text-sm text-gray-600 mb-3">
          TidyTrails provides professional yard and landscape maintenance for all types of commercial properties in Timmins, including:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Customized service schedules to meet your property's specific needs</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Professional, uniformed crews with commercial-grade equipment</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Liability insurance and worker's compensation coverage</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Seasonal contracts and multi-year agreements available</span>
          </li>
        </ul>
        
        <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-100 text-sm text-amber-800">
          <p className="flex items-start">
            <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Commercial pricing starts at $200/month</strong> with custom quotes based on your specific property size and service requirements.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommercialInquiry;
