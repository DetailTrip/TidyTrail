import { useState, useEffect } from 'react';

export const useServiceRecommendations = (selectedServices: string[]) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const serviceMap: { [key: string]: string[] } = {
      "lawn-mowing": ["fertilizing", "weed-control"],
      "snow-removal": ["salt-spreading", "driveway-cleaning"],
    };
    const newRecommendations = selectedServices.flatMap(service => serviceMap[service] || []);
    setRecommendations([...new Set(newRecommendations)]);
  }, [selectedServices]);

  return recommendations;
};