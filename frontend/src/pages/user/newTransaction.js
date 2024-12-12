import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import Loading from '../../components/Loading';
import Info from '../../components/Info';
import Container from '../../components/Container';
import Header from '../../components/Header';
import TransactionForm from './TransactionForm';
import TransactionTypeSelectWrapper from './transactionTypeSelectWrapper';

function NewTransaction() {

    const [categories, isFetching] = useCategories();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [activeTransactionType, setTransactionType] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(""); // State to manage selected currency

    const navigate = useNavigate();

    useEffect(() => {
        setFilteredCategories(categories.filter(cat => cat.transactionType.transactionTypeId === activeTransactionType));
    }, [categories, activeTransactionType]);

    const onSubmit = async (data) => {
        setIsSaving(true);
        await UserService.add_transaction(
            AuthService.getCurrentUser().email,
            data.category,
            data.description,
            data.amount,
            data.date,
            selectedCurrency // Include selected currency in transaction data
        ).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    navigate("/user/transactions", { state: { text: response.data.response } });
                }
            },
            (error) => {
                error.response ?
                    toast.error(error.response.data.response) :
                    toast.error("Failed to add transaction: Try again later!");
            }
        );
        setIsSaving(false);
    }

    const selectCurrency = (currency) => {
        setSelectedCurrency(currency);
        setTransactionType(1); // Reset transaction type when currency is changed if needed
        // Trigger any other necessary effects based on the selected currency here
    }

    const renderCurrencySelector = () => {
        const currencies = ['USD', 'EUR', 'GBP']; // Placeholder for available currencies
        return (
            <select value={selectedCurrency} onChange={(e) => selectCurrency(e.target.value)}>
                <option value="" disabled>Select Currency</option>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
        );
    }

    return (
        <Container activeNavId={2}>
            <Header title="New Transaction" />
            <Toaster />
            {(isFetching) && <Loading />}
            {(!isFetching && categories.length === 0) && <Info text="No data found!" />}
            {(!isFetching && categories.length !== 0) && (
                <>
                    {renderCurrencySelector()} {/* Render currency selector here */}
                    <TransactionTypeSelectWrapper
                        transactionTypes={transactionTypes}
                        setTransactionType={setTransactionType}
                        activeTransactionType={activeTransactionType}
                    />
                    <TransactionForm categories={filteredCategories} onSubmit={onSubmit} isSaving={isSaving} />
                </>
            )}
        </Container>
    );
}

export default NewTransaction;
