// frontend/src/pages/user/transactions.js

import React, { useEffect, useState } from 'react';
import { getTransactionsByUser } from 'path-to-your-api/getTransactions';
import { convert_currency } from 'path-to-your-currency-manager/currency_manager';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('usd'); // Default currency
    const [convertedTransactions, setConvertedTransactions] = useState([]);

    // Fetch transactions and convert them to selected currency
    const fetch_converted_transactions = async () => {
        try {
            const userTransactions = await getTransactionsByUser(); // Fetch user's transactions
            const converted = await Promise.all(userTransactions.map(async (transaction) => {
                const convertedAmountResponse = await convert_currency(transaction.currency, selectedCurrency, transaction.amount);
                if (convertedAmountResponse.error) {
                    console.error(`Error converting transaction ${transaction.id}: ${convertedAmountResponse.error}`);
                    return { ...transaction, convertedAmount: transaction.amount }; // Fallback to original amount
                }
                return { ...transaction, convertedAmount: convertedAmountResponse.converted_amount };
            }));
            setConvertedTransactions(converted); // Update state with converted transactions
        } catch (error) {
            console.error("Error fetching or converting transactions:", error);
        }
    };

    useEffect(() => {
        fetch_converted_transactions(); // Fetch transactions on component mount or currency change
    }, [selectedCurrency]);

    return (
        <div>
            <h1>Your Transactions</h1>
            <select onChange={(e) => setSelectedCurrency(e.target.value)} value={selectedCurrency}>
                {/* Populate with available currencies */}
                <option value="usd">USD</option>
                {/* Add more currency options here */}
            </select>
            <ul>
                {convertedTransactions.map(transaction => (
                    <li key={transaction.id}>
                        Transaction ID: {transaction.id} - Amount: {transaction.convertedAmount} {selectedCurrency}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
