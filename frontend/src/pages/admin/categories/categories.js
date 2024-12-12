import React, { useEffect } from 'react';
import { Container, Header, Loading, Info, Toaster } from 'your-components-library'; // Ensure to import necessary components
import useCategories from '../../hooks/useCategories'; // Ensure correct path
import AdminService from '../../services/adminService'; // Ensure correct path
import CategoriesTableHeader from './CategoriesTableHeader';
import CategoriesTableBody from './CategoriesTableBody';

function AdminCategoriesManagement() {

    const [data, isFetching] = useCategories([]);

    const disableOrEnable = async (categoryId) => {
        await AdminService.disableOrEnableCategory(categoryId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload();
                }
            },
            (error) => {
                toast.error("Failed to update category: Try again later!");
            }
        );
    };

    return (
        <Container activeNavId={6}>
            <Header title="Categories" />
            <Toaster />
            {isFetching && <Loading />}
            {!isFetching && data.length === 0 && <Info text={"No categories found!"} />}
            {!isFetching && data.length !== 0 && (
                <table>
                    <CategoriesTableHeader />
                    <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} />
                </table>
            )}
        </Container>
    );
}

// Fetch Categories - This will call the custom hook to fetch the categories data.
const fetchCategories = async () => {
    const [categories, setCategories] = useCategories();
    try {
        const response = await UserService.get_categories();
        if (response.data.status === "SUCCESS") {
            setCategories(response.data.response);
        } else {
            throw new Error("Failed to fetch categories.");
        }
    } catch (error) {
        toast.error("Failed to fetch categories: " + (error.response ? error.response.data.response : "Try again later!"));
    }
    return categories;
}

// Render Category Rows - Iterate over the fetched categories to dynamically render them in the table.
const renderCategoryRows = (data, disableOrEnable) => {
    return data.map((item) => (
        <tr key={item.categoryId}>
            <td>{"C" + String(item.categoryId).padStart(5, '0')}</td>
            <td>{item.categoryName}</td>
            <td>{item.transactionType.transactionTypeName}</td>
            <td style={{ color: item.enabled ? '#6aa412' : '#ff0000' }}>
                {item.enabled ? 'Enabled' : 'Disabled'}
            </td>
            <td style={{ display: 'flex', gap: '5px' }}>
                {item.enabled ? (
                    <button onClick={() => disableOrEnable(item.categoryId)} style={{ backgroundColor: '#ff0000' }}>
                        Disable
                    </button>
                ) : (
                    <button onClick={() => disableOrEnable(item.categoryId)} style={{ backgroundColor: '#6aa412' }}>
                        Enable
                    </button>
                )}
            </td>
        </tr>
    ));
}

export default AdminCategoriesManagement;
