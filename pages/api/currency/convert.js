import { executeQuery } from '../../../lib/db-config';
import { initializeDatabase } from '../../../lib/db';

// Initialize the database on first API call
let dbInitialized = false;

export default async function handler(req, res) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initializeDatabase();
      dbInitialized = true;
    }
    
    if (req.method === 'GET') {
      const { amount, from, to } = req.query;
      
      // Basic validation
      if (!amount || !from || !to) {
        return res.status(400).json({ success: false, message: 'Amount, from currency, and to currency are required' });
      }
      
      // Parse amount to float
      const parsedAmount = parseFloat(amount);
      
      if (isNaN(parsedAmount)) {
        return res.status(400).json({ success: false, message: 'Amount must be a valid number' });
      }
      
      // Get exchange rate from database
      const rateQuery = await executeQuery({
        query: 'SELECT rate FROM exchange_rates WHERE from_currency = ? AND to_currency = ?',
        values: [from, to]
      });
      
      // If rate not found in database, try the reverse and invert
      let rate;
      if (rateQuery.length > 0) {
        rate = rateQuery[0].rate;
      } else {
        // Check for reverse rate
        const reverseRateQuery = await executeQuery({
          query: 'SELECT rate FROM exchange_rates WHERE from_currency = ? AND to_currency = ?',
          values: [to, from]
        });
        
        if (reverseRateQuery.length > 0) {
          // Invert the rate
          rate = 1 / reverseRateQuery[0].rate;
        } else {
          // Use hardcoded fallback rates if database has no rates
          if (from === 'KES' && to === 'USD') {
            rate = 0.0072; // 1 KES = 0.0072 USD (139 KES = 1 USD)
          } else if (from === 'USD' && to === 'KES') {
            rate = 139.0; // 1 USD = 139 KES
          } else {
            return res.status(400).json({ success: false, message: 'Unsupported currency conversion' });
          }
          
          // Store the rate in the database for future use
          await executeQuery({
            query: 'INSERT INTO exchange_rates (from_currency, to_currency, rate, updated_at) VALUES (?, ?, ?, NOW())',
            values: [from, to, rate]
          });
        }
      }
      
      // Convert currency
      const convertedAmount = parsedAmount * rate;
      
      // Log the conversion in the database
      await executeQuery({
        query: 'INSERT INTO currency_conversions (amount, from_currency, to_currency, converted_amount, rate, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        values: [parsedAmount, from, to, convertedAmount, rate]
      });
      
      return res.status(200).json({ 
        success: true, 
        data: {
          amount: parsedAmount,
          from,
          to,
          rate,
          convertedAmount: parseFloat(convertedAmount.toFixed(2)),
          timestamp: new Date().toISOString()
        }
      });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
        to,
        convertedAmount: formattedAmount,
        rate: from === 'KES' ? rates.KES_TO_USD : rates.USD_TO_KES,
        timestamp: new Date().toISOString()
      }
    });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
