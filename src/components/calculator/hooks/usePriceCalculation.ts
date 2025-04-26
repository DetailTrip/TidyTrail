import { useState, useEffect } from 'react';

export const usePriceCalculation = (basePrice: number, options: { discount?: number; surcharge?: number } = {}) => {
    const [price, setPrice] = useState(basePrice);
  
    useEffect(() => {
      let updatedPrice = basePrice;
      if (options.discount) updatedPrice -= options.discount;
      if (options.surcharge) updatedPrice += options.surcharge;
      setPrice(updatedPrice);
    }, [basePrice, options]);
  
    return price;
  };