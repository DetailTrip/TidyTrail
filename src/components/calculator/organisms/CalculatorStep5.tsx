import React, { useState } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import PriceDisplay from '../atoms/PriceDisplay';

const CalculatorStep5: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { services, contact, pricing } = state;
  
  const [formState, setFormState] = useState(contact);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const selectedServices = services.filter(service => service.selected);
  const currentFrequency = selectedServices.length > 0 && selectedServices[0].frequency 
    ? selectedServices[0].frequency 
    : 'one-time';
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle checkbox changes for contact times
  const handleContactTimeChange = (time: string) => {
    setFormState(prevState => {
      const currentTimes = prevState.contactTime || [];
      const newTimes = currentTimes.includes(time)
        ? currentTimes.filter(t => t !== time)
        : [...currentTimes, time];
      
      return {
        ...prevState,
        contactTime: newTimes
      };
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formState.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formState.neighborhood.trim()) {
      newErrors.neighborhood = 'Neighborhood is required';
    }
    
    if (formState.contactTime.length === 0) {
      newErrors.contactTime = 'Please select at least one preferred contact time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Update contact info in context
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: formState
      });
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You, {formState.firstName}!</h2>
        
        <div className="max-w-md mx-auto mb-8">
          <p className="text-gray-600 mb-4">
            Your spot on our waitlist has been confirmed. We'll contact you when we launch our services in late May 2025.
          </p>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Quote Summary</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedServices.map(s => s.name).join(', ')}
            </p>
            
            <div className="flex justify-center">
              <PriceDisplay 
                amount={pricing.totalPrice}
                period={currentFrequency === 'one-time' ? 'one-time' : 'per-visit'}
                size="large"
              />
            </div>
            
            {currentFrequency !== 'one-time' && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {currentFrequency === 'weekly' ? 'Weekly' : 
                 currentFrequency === 'bi-weekly' ? 'Bi-weekly' : 'Monthly'} service
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              // Logic to save quote as PDF would go here
              alert('This would save your quote as a PDF in a real implementation');
            }}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Quote
          </button>
          
          <button
            onClick={() => {
              dispatch({ type: 'RESET_CALCULATOR' });
            }}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start New Quote
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Our Waitlist</h2>
      <p className="text-gray-600 mb-8">
        We're launching in late May 2025. Enter your details below to secure your spot on our waitlist and get priority service.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    {...(errors.firstName ? {'aria-invalid': 'true', 'aria-describedby': 'firstName-error'} : {'aria-invalid': 'false'})}
                    value={formState.firstName}
                    onChange={handleChange}
                    className={`block w-full rounded-md shadow-sm py-2 px-3
                                ${errors.firstName 
                                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                                  : 'border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white'}`}
                  />
                  
                  {errors.firstName && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400" id="firstName-error">
                    {errors.firstName}
                  </p>
                )}
              </div>
              
              <div className="space-y-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Your last name"
                    {...(errors.lastName ? {'aria-invalid': 'true', 'aria-describedby': 'lastName-error'} : {'aria-invalid': 'false'})}
                    value={formState.lastName}
                    onChange={handleChange}
                    className={`block w-full rounded-md shadow-sm py-2 px-3
                                ${errors.lastName 
                                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                                  : 'border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white'}`}
                  />
                  
                  {errors.lastName && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400" id="lastName-error">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
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
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                Neighborhood in Timmins *
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={formState.neighborhood}
                onChange={handleChange}
                placeholder="e.g., Downtown, Mountjoy, etc."
                className={`w-full p-2 border rounded-md ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.neighborhood && (
                <p id="neighborhood-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.neighborhood}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Time *
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Morning', 'Afternoon', 'Evening', 'Weekend'].map((time) => (
                    <div key={time} className="flex items-center">
                      <input
                        id={`time-${time}`}
                        name="contactTime"
                        type="checkbox"
                        checked={formState.contactTime.includes(time)}
                        onChange={() => handleContactTimeChange(time)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`time-${time}`} className="ml-2 block text-sm text-gray-700">
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.contactTime && (
                  <p id="contactTime-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.contactTime}
                  </p>
                )}
              </fieldset>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Tell us any specific details about your property or service needs"
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  isSubmitting ? 'bg-primary-light' : 'bg-primary hover:bg-primary-dark'
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
                  'Join Waitlist'
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Your Quote</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedServices.map(s => s.name).join(', ')}
              <br />
              {currentFrequency === 'weekly' ? 'Weekly' : 
               currentFrequency === 'bi-weekly' ? 'Bi-weekly' : 
               currentFrequency === 'monthly' ? 'Monthly' : 'One-time'} service
            </p>
            
            <div className="flex justify-center">
              <PriceDisplay 
                amount={pricing.totalPrice}
                period={currentFrequency === 'one-time' ? 'one-time' : 'per-visit'}
                size="medium"
              />
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">Why Join Our Waitlist?</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority scheduling when we launch</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Lock in the quoted price for the entire season</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>We'll contact you in May to confirm your schedule</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No payment required until service begins</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>
          By joining our waitlist, you're not committed to purchasing services.
          <br />
          We'll contact you when we launch to confirm your interest and schedule.
        </p>
      </div>
    </div>
  );
};

export default CalculatorStep5;

