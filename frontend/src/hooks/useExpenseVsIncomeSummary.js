import { useEffect, useState } from "react";
import UserService from "../services/userService";
import AuthService from "../services/auth.service";

function useExpenseVsIncomeSummary(months) {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await UserService.getMonthlySummary(AuthService.getCurrentUser().email);
                if (response.data.status === "SUCCESS") {
                    generateData(response.data.response);
                } else {
                    setIsError(true);
                }
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, []); // Empty dependency array ensures this runs only once

    const generateData = (fetchedData) => {
        const finalData = months.map(({ id, monthName }) => {
            const monthData = fetchedData.find((t) => t.month === id);
            return {
                id,
                monthName,
                totalIncome: monthData ? monthData.total_income : 0,
                totalExpense: monthData ? monthData.total_expense : 0,
            };
        });
        setData(finalData);
    };

    return [data, isLoading, isError];
}

export default useExpenseVsIncomeSummary;