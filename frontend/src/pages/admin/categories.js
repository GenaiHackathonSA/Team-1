import React, { useState } from 'react';
import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";

const transactionTypes = [{ id: 1, name: 'Expense' }, { id: 2, name: 'Income' }];

function AdminCategoriesManagement() {
    const [data, isFetching] = useCategories([]);
    const [newCategory, setNewCategory] = useState({ categoryName: '', transactionTypeId: '' });
    const [isAdding, setIsAdding] = useState(false);

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

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        await AdminService.addCategory(newCategory.categoryName, newCategory.transactionTypeId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload();
                }
            },
            (error) => {
                toast.error("Failed to add category: Try again later!");
            }
        );
        setIsAdding(false);
    };

    return (
        <Container activeNavId={6}>
            <Header title="Categories" />
            <Toaster />
            {(isFetching || isAdding) && <Loading />}
            {(!isFetching && !isAdding) && (data.length === 0) && <Info text={"No categories found!"} />}
            {(!isFetching && !isAdding) && (data.length !== 0) && (
                <>
                    <form onSubmit={handleAddCategory}>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.categoryName}
                            onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                            required
                        />
                        <select
                            value={newCategory.transactionTypeId}
                            onChange={(e) => setNewCategory({ ...newCategory, transactionTypeId: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Transaction Type</option>
                            {transactionTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        <button type="submit">Add Category</button>
                    </form>
                    <table>
                        <CategoriesTableHeader />
                        <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} />
                    </table>
                </>
            )}
        </Container>
    );
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
    return (
        <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Action</th>
        </tr>
    );
}

function CategoriesTableBody({ data, disableOrEnable }) {
    return (
        data.map((item) => {
            return (
                <tr key={item.categoryId}>
                    <td>{"C" + String(item.categoryId).padStart(5, '0')}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.transactionType.transactionTypeName}</td>
                    {
                        item.enabled ? <td style={{ color: '#6aa412' }}>Enabled</td> : <td style={{ color: '#ff0000' }}>Disabled</td>
                    }
                    <td style={{ display: 'flex', gap: '5px' }}>
                        {
                            (item.enabled) ?
                                (<button
                                    onClick={() => disableOrEnable(item.categoryId)}
                                    style={{ backgroundColor: '#ff0000' }}
                                >
                                    Disable
                                </button>)
                                :
                                (<button
                                    onClick={() => disableOrEnable(item.categoryId)}
                                    style={{ backgroundColor: '#6aa412' }}
                                >
                                    Enable
                                </button>)
                        }
                    </td>
                </tr>
            );
        })
    );
}