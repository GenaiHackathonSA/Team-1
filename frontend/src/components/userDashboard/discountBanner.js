import React, { useEffect, useState } from 'react';
import { getPartnerBrandDiscounts } from '../../services/PartnerBrandService';
import { Container, Link } from 'react-bootstrap';
import Loading from '../Loading';
import { toast } from 'react-toastify';

const DISCOUNT_API_URL = 'https://675172c8d1983b9597b2ceaa.mockapi.io/mockads/v1/ad';

export function DiscountBanner() {
    const [discounts, setDiscounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Function to fetch the discounts from the mock API
    const fetchDiscounts = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(DISCOUNT_API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDiscounts(data);
        } catch (error) {
            setIsError(true);
            toast.error("Failed to fetch discounts. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);
    
    return (
        <div className="discount-banner">
            {isLoading && <Loading />}
            {isError && <p>Error loading discounts!</p>}
            {!isLoading && !isError && discounts.length > 0 && (
                <ul>
                    {discounts.map((discount, index) => (
                        <li key={index}>
                            <h4>{discount.title}</h4>
                            <p>{discount.description}</p>
                            <Link to={`/discounts/${discount.id}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}
            {!isLoading && !isError && discounts.length === 0 && (
                <p>No exclusive discounts available at the moment.</p>
            )}
        </div>
    );
}

export function DiscountDashboard() {
    return (
        <Container>
            <h2>Exclusive Discounts</h2>
            <DiscountBanner />
        </Container>
    );
}
