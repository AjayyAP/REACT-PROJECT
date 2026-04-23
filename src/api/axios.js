import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expense-backend-fib9.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
 