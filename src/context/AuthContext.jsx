import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            
            const response = await api.get(`/users?email=${email}&password=${password}`);
            const users = response.data;

            if (users.length > 0) {
                const authenticatedUser = users[0];
              
                setUser(authenticatedUser);
                localStorage.setItem('user', JSON.stringify(authenticatedUser));
                toast.success(`Welcome back, ${authenticatedUser.name}!`);
                return true;
            } else {
                setError('Invalid email or password');
                toast.error('Invalid email or password');
                return false;
            }
        } catch (err) {
            setError(err.message || 'Login failed');
            toast.error(err.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            
            const checkRes = await api.get(`/users?email=${email}`);
            if (checkRes.data.length > 0) {
                setError('User already exists with this email');
                toast.error('User already exists with this email');
                return false;
            }

            const newUser = {
                id: uuidv4(),
                name,
                email,
                password, 
                createdAt: new Date().toISOString()
            };

            const response = await api.post('/users', newUser);

            if (response.status === 201) {
                const createdUser = response.data;
                setUser(createdUser);
                localStorage.setItem('user', JSON.stringify(createdUser));
                toast.success('Account created successfully!');
                return true;
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
            toast.error(err.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
    };

    const updateBudget = async (amount) => {
        if (!user) return false;
      
        try {
            const budgetValue = parseFloat(amount);
            await api.patch(`/users/${user.id}`, { budget: budgetValue });

            const updatedUser = { ...user, budget: budgetValue };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            toast.success('Budget updated successfully');
            return true;
        } catch (err) {
            console.error(err);
            toast.error('Failed to update budget');
            return false;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateBudget
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
