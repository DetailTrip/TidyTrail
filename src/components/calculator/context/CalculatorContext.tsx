import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the state types
export type PropertyType = 'residential' | 'commercial';
export type YardSize = 'small' | 'medium' | 'large' | 'x-large';
export type GrassHeight = 'short' | 'medium' | 'long';
export type ServiceFrequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
export type SpecialCondition = 'slope' | 'debris' | 'difficult-access';

export interface Service {
  id: string;
  name: string;
  selected: boolean;
  frequency?: ServiceFrequency;
  price?: number;
}

export interface CalculatorState {
  currentStep: number;
  property: {
    type: PropertyType;
    yardSize: YardSize;
    grassHeight?: GrassHeight;
    hasPets: boolean;
    specialConditions: SpecialCondition[];
  };
  services: Service[];
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    neighborhood: string;
    contactTime: string[];
    message: string;
  };
  pricing: {
    basePrice: number;
    frequencyDiscount: number;
    bundleDiscount: number;
    specialConditionSurcharge: number;
    seasonalAdjustment: number;
    totalPrice: number;
  };
}

// Define initial state
const initialState: CalculatorState = {
  currentStep: 1,
  property: {
    type: 'residential',
    yardSize: 'small',
    grassHeight: 'short',
    hasPets: false,
    specialConditions: [],
  },
  services: [
    { id: 'lawn-mowing', name: 'Lawn Mowing & Maintenance', selected: false },
    { id: 'pet-waste', name: 'Pet Waste Cleanup', selected: false },
    { id: 'spring-cleanup', name: 'Spring Cleanup', selected: false },
    { id: 'fall-cleanup', name: 'Fall Cleanup', selected: false },
    { id: 'patio-cleaning', name: 'Patio & Furniture Cleaning', selected: false },
    { id: 'deodorizing', name: 'Deodorizing & Stain Treatment', selected: false },
  ],
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    neighborhood: '',
    contactTime: [],
    message: '',
  },
  pricing: {
    basePrice: 0,
    frequencyDiscount: 0,
    bundleDiscount: 0,
    specialConditionSurcharge: 0,
    seasonalAdjustment: 0,
    totalPrice: 0,
  },
};

// Define actions
type CalculatorAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_PROPERTY'; payload: Partial<CalculatorState['property']> }
  | { type: 'TOGGLE_SERVICE'; payload: string }
  | { type: 'SET_SERVICE_FREQUENCY'; payload: { id: string; frequency: ServiceFrequency } }
  | { type: 'UPDATE_CONTACT'; payload: Partial<CalculatorState['contact']> }
  | { type: 'UPDATE_PRICING'; payload: Partial<CalculatorState['pricing']> }
  | { type: 'RESET_CALCULATOR' }
  | { type: 'RESTORE_STATE'; payload: CalculatorState }; // Ensure this is here

// Create reducer
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'UPDATE_PROPERTY':
      return { ...state, property: { ...state.property, ...action.payload } };

    case 'TOGGLE_SERVICE':
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload
            ? { ...service, selected: !service.selected }
            : service
        ),
      };

    case 'SET_SERVICE_FREQUENCY':
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload.id
            ? { ...service, frequency: action.payload.frequency }
            : service
        ),
      };

    case 'UPDATE_CONTACT':
      return { ...state, contact: { ...state.contact, ...action.payload } };

    case 'UPDATE_PRICING':
      return { ...state, pricing: { ...state.pricing, ...action.payload } };

    case 'RESET_CALCULATOR':
      return initialState;

    case 'RESTORE_STATE': // New case for restoring state
      return action.payload;

    default:
      return state;
  }
}

// Create context
interface CalculatorContextType {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Create provider component
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

// Create custom hook for using the context
export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
