import React, { useState, useEffect } from 'react';
import { convert_currency } from '../../../currency-converter-api/currency_manager';

const NewSavedTransaction = () => {
    const [amount, setAmount] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('USD'); // Default currency
    const [targetCurrency, setTargetCurrency] = useState('USD'); // Default currency
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [error, setError] = useState('');

    // Function to handle currency conversion
    const handle_currency_conversion = async () => {
        try {
            // Validate input amount
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                setError("Please enter a valid amount.");
                return;
            }

            // Perform currency conversion
            const response = await convert_currency(sourceCurrency, targetCurrency, parseFloat(amount));
            if (response.error) {
                setError(response.error);
            } else {
                setConvertedAmount(response.converted_amount);
                setError(''); // Clear any previous errors
            }
        } catch (e) {
            console.error("An error occurred during currency conversion:", e);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    // Function to load available currencies (implement based on your needs)
    const loadAvailableCurrencies = async () => {
        // Example fetch function, replace with actual service call if needed
        const currencies = await fetch('/api/currencies'); // Placeholder API call
        const data = await currencies.json();
        setCurrencyOptions(data);
    };

    useEffect(() => {
        loadAvailableCurrencies();
    }, []);
    
    return (
        <div>
            <h1>Create New Saved Transaction</h1>
            <div>
                <input 
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Amount" 
                />
                <select onChange={(e) => setSourceCurrency(e.target.value)} value={sourceCurrency}>
                    {currencyOptions.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <select onChange={(e) => setTargetCurrency(e.target.value)} value={targetCurrency}>
                    {currencyOptions.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <button onClick={handle_currency_conversion}>Convert Currency</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {convertedAmount !== null && <p>Converted Amount: {convertedAmount}</p>}
            </div>
        </div>
    );
};

export default NewSavedTransaction;
