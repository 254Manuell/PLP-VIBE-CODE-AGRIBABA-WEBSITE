import { createContext, useState, useContext, useEffect } from 'react';

// Exchange rate (1 USD = X KES)
const KES_TO_USD_RATE = 0.0078; // Approximately 128 KES = 1 USD
const USD_TO_KES_RATE = 128.0;

export const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('KES');
  
  // Load saved currency preference from localStorage if available
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);
  
  // Save currency preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  const toggleCurrency = () => {
    setCurrency(prevCurrency => prevCurrency === 'KES' ? 'USD' : 'KES');
  };
  
  const formatPrice = (priceInKES) => {
    if (currency === 'USD') {
      const priceInUSD = priceInKES * KES_TO_USD_RATE;
      return `$${priceInUSD.toFixed(2)}`;
    } else {
      return `KES ${priceInKES.toFixed(2)}`;
    }
  };
  
  const convertPrice = (price, fromCurrency) => {
    if (fromCurrency === 'KES' && currency === 'USD') {
      return price * KES_TO_USD_RATE;
    } else if (fromCurrency === 'USD' && currency === 'KES') {
      return price * USD_TO_KES_RATE;
    }
    return price;
  };
  
  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      toggleCurrency, 
      formatPrice,
      convertPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
