import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchExpenses = useCallback(async () => {
        if (!user) {
            setExpenses([]);
            return;
        }

        setLoading(true);
        try {
            const response = await api.get(`/expenses?userId=${user.id}&_sort=date&_order=desc`);
            setExpenses(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch expenses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const addExpense = async (expenseData) => {
        setLoading(true);
        try {
            const newExpense = {
                id: uuidv4(),
                userId: user.id,
                ...expenseData,
                amount: parseFloat(expenseData.amount), // Ensure number
                createdAt: new Date().toISOString()
            };

            const response = await api.post('/expenses', newExpense);
            setExpenses(prev => [response.data, ...prev]);
            toast.success('Expense added successfully');
            return true;
        } catch (err) {
            setError('Failed to add expense');
            toast.error('Failed to add expense');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses(prev => prev.filter(exp => exp.id !== id));
            toast.success('Expense deleted successfully');
            return true;
        } catch (err) {
            setError('Failed to delete expense');
            toast.error('Failed to delete expense');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateExpense = async (id, updates) => {
        setLoading(true);
        try {
            const updatedData = { ...updates };
            if (updatedData.amount) updatedData.amount = parseFloat(updatedData.amount);

            const response = await api.patch(`/expenses/${id}`, updatedData);
            setExpenses(prev => prev.map(exp => exp.id === id ? response.data : exp));
            toast.success('Expense updated successfully');
            return true;
        } catch (err) {
            setError('Failed to update expense');
            toast.error('Failed to update expense');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
        updateExpense,
        refreshExpenses: fetchExpenses
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
};
