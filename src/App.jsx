import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Expenses from './pages/Expenses';
import Insights from './pages/Insights';
import TransactionDetails from './pages/TransactionDetails';
import { Toaster } from 'react-hot-toast';

const NotFound = () => <div className="text-center mt-5">404 - Page Not Found</div>;

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="expenses/:id" element={<TransactionDetails />} />
              <Route path="ai-insights" element={<Insights />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
