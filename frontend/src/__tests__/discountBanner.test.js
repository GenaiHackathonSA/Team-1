import React, { useEffect, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DiscountBanner } from '../components/userDashboard/discountBanner';
import * as PartnerBrandService from '../services/PartnerBrandService';
import { toast } from 'react-toastify';

jest.mock('../services/PartnerBrandService');

describe('DiscountBanner Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders DiscountBanner correctly and displays discounts', async () => {
        const mockDiscounts = [
            { id: 1, title: '10% off on Shoes', description: 'Exclusive offer for members', link: '/details/1' },
            { id: 2, title: 'Free Shipping', description: 'On orders over $50', link: '/details/2' }
        ];
        
        PartnerBrandService.getPartnerBrandDiscounts.mockResolvedValueOnce({ data: { status: "SUCCESS", response: mockDiscounts } });

        render(<DiscountBanner />);

        await waitFor(() => expect(PartnerBrandService.getPartnerBrandDiscounts).toHaveBeenCalledTimes(1));

        expect(screen.getByText(/exclusive discounts/i)).toBeInTheDocument();
        expect(screen.getByText(/10% off on Shoes/i)).toBeInTheDocument();
        expect(screen.getByText(/Free Shipping/i)).toBeInTheDocument();
    });

    test('shows loading state when fetching discounts', async () => {
        PartnerBrandService.getPartnerBrandDiscounts.mockImplementationOnce(() => new Promise(() => {})); // Simulate a pending promise
        render(<DiscountBanner />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('handles errors fetching discounts', async () => {
        const errorMessage = "Failed to fetch discounts!";
        PartnerBrandService.getPartnerBrandDiscounts.mockRejectedValueOnce(new Error(errorMessage));
        toast.error = jest.fn(); // Mock the toast function

        render(<DiscountBanner />);

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Failed to fetch discounts!"));
    });
});

describe('fetchDiscounts function', () => {
    test('validates the fetchDiscounts functionality', async () => {
        const mockDiscounts = [{ id: 1, title: 'Summer Sale', description: 'Get 30% off!', link: '/details/1' }];
        
        PartnerBrandService.getPartnerBrandDiscounts.mockResolvedValueOnce({ data: { status: "SUCCESS", response: mockDiscounts } });

        const discounts = await fetchDiscounts();

        expect(discounts).toEqual(mockDiscounts);
        expect(PartnerBrandService.getPartnerBrandDiscounts).toHaveBeenCalled();
    });

    test('handles errors correctly in fetchDiscounts', async () => {
        const errorMessage = "API error";
        PartnerBrandService.getPartnerBrandDiscounts.mockRejectedValueOnce(new Error(errorMessage));
        
        await expect(fetchDiscounts()).rejects.toThrow(errorMessage);
    });
});

const fetchDiscounts = async () => {
    try {
        const response = await fetch('https://675172c8d1983b9597b2ceaa.mockapi.io/mockads/v1/ad');
        const data = await response.json();
        if (!response.ok || data.status !== "SUCCESS") {
            throw new Error(data.message || "Failed to fetch discounts");
        }
        return data.response;
    } catch (error) {
        toast.error("Failed to fetch discounts!");
        throw error;
    }
};

