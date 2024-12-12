import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { selectCurrency } from '../../pages/user/newTransaction';

const CurrencyDropdown = ({ availableCurrencies, onCurrencyChange }) => {
    const [selectedCurrency, setSelectedCurrency] = useState(availableCurrencies[0]);

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setSelectedCurrency(newCurrency);
        onCurrencyChange(newCurrency); // Notify parent of the currency change
        selectCurrency(newCurrency); // Call the existing selectCurrency function
    };

    return (
        <div>
            <label htmlFor="currency-select">Select Currency:</label>
            <select
                id="currency-select"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                style={{ margin: '0 15px 0 0' }}
            >
                {availableCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

CurrencyDropdown.propTypes = {
    availableCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
};

export default CurrencyDropdown;
