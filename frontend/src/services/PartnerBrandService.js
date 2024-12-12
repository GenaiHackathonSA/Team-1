import axios from 'axios';
import AuthService from './authService'; // Assuming AuthService is in the same directory

const API_BASE_URL = process.env.API_BASE_URL; // Ensure this environment variable is set

/**
 * Retrieves exclusive discounts from partner brands based on user profile and spending habits.
 * @param {Object} params - The parameters to filter the discounts.
 * @param {string} params.userId - The ID of the current user.
 * @param {Object} [params.filters] - Optional filters for fetching discounts.
 * @returns {Promise<Object>} - A promise that resolves to the discounts data.
 */
const getPartnerBrandDiscounts = async ({ userId, filters = {} }) => {
    if (!userId) {
        throw new Error("User ID is required to fetch discounts.");
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/discounts/partner`, {
            headers: AuthService.authHeader(),
            params: {
                userId,
                ...filters // Spread filters to include them in the query if any
            }
        });
        return response.data; // Assuming the API returns data in the response body
    } catch (error) {
        console.error("Error fetching partner brand discounts:", error);
        throw new Error("Failed to fetch partner brand discounts. Please try again later.");
    }
};

/**
 * Fetches banner advertisements from a mock API.
 * @returns {Promise<Object>} - A promise that resolves to the banner data.
 */
const getBannerAds = async () => {
    try {
        const response = await axios.get('https://675172c8d1983b9597b2ceaa.mockapi.io/mockads/v1/ad');
        return response.data; // Assuming the API returns data in the response body
    } catch (error) {
        console.error("Error fetching banner ads:", error);
        throw new Error("Failed to fetch banner advertisements. Please try again later.");
    }
};

export { getPartnerBrandDiscounts, getBannerAds };
