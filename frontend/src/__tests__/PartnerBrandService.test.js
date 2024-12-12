import axios from 'axios';
import { getPartnerBrandDiscounts } from '../services/PartnerBrandService';

jest.mock('axios');

describe('PartnerBrandService', () => {
    describe('getPartnerBrandDiscounts', () => {
        it('should fetch discounts for a user profile successfully', async () => {
            const userId = '12345';
            const responseData = {
                discounts: [
                    { id: '1', description: '10% off on Brand A', expiry: '2024-12-31' },
                    { id: '2', description: '15% off on Brand B', expiry: '2025-01-15' }
                ]
            };
            
            axios.get.mockResolvedValue({ data: responseData });

            const discounts = await getPartnerBrandDiscounts(userId);

            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/discounts'), {
                params: { userId },
            });
            expect(discounts).toEqual(responseData.discounts);
        });

        it('should handle error when fetching discounts', async () => {
            const userId = '12345';
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(getPartnerBrandDiscounts(userId)).rejects.toThrow(errorMessage);
        });

        it('should not fail if API response is empty', async () => {
            const userId = '12345';
            axios.get.mockResolvedValue({ data: {} }); // Simulate an empty response

            const discounts = await getPartnerBrandDiscounts(userId);

            expect(discounts).toEqual([]); // Here we expect an empty array
        });
    });
    
    describe('Banner API integration', () => {
        it('should fetch banner data successfully', async () => {
            const bannerResponseData = {
                id: '1',
                title: 'Promo Banner',
                imageUrl: 'https://example.com/banner.jpg',
                link: 'https://example.com/details'
            };

            axios.get.mockResolvedValue({ data: bannerResponseData });

            const response = await axios.get('https://675172c8d1983b9597b2ceaa.mockapi.io/mockads/v1/ad');
            expect(response.data).toEqual(bannerResponseData);
        });

        it('should handle error when fetching banner data', async () => {
            const errorMessage = 'Banner API Error';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(axios.get('https://675172c8d1983b9597b2ceaa.mockapi.io/mockads/v1/ad')).rejects.toThrow(errorMessage);
        });
    });
});
