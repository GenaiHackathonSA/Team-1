// File: frontend/src/services/adminService.js

import axios from 'axios';
import { API_BASE_URL } from '../config';
import AuthService from './AuthService'; // Ensure to import AuthService if it is used for authentication headers

/**
 * Function to toggle the status of a category (enable/disable)
 * @param {number} categoryId - The ID of the category to toggle
 * @returns {Promise<Object>} - The response from the backend API indicating success or failure
 * @throws {Error} - Throws an error if the request fails
 */
export const disableOrEnableCategory = async (categoryId) => {
    try {
        const response = await axios.patch(
            API_BASE_URL + "/category/toggle", // Assuming the backend uses PATCH for toggling
            null, // No body needed for this operation
            {
                headers: AuthService.authHeader(),
                params: {
                    categoryId: categoryId
                }
            }
        );

        if (response.status !== 200) {
            throw new Error('Failed to toggle category status');
        }

        return response.data; // Assuming the API returns data on success

    } catch (error) {
        console.error("Error disabling/enabling category:", error);
        throw new Error('Could not toggle category status. Please try again later!');
    }
};
