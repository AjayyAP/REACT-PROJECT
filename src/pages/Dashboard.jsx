import { Row, Col, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useCountUp } from '../hooks/useCountUp';
import { SkeletonCard, SkeletonChart } from '../components/skeletons/SkeletonLoader';

// Assets (Replaced with Bootstrap Icons)

const Dashboard = () => {
    const { expenses, loading } = useExpenses();
    const { user } = useAuth();

    // Initial loading state
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const isLoading = isInitialLoad || loading;

    // --- Calculations ---
    const totalExpenses = expenses.reduce((acc, curr) => acc + (curr.type === 'expense' ? curr.amount : 0), 0);
    const totalIncome = expenses.reduce((acc, curr) => acc + (curr.type === 'income' ? curr.amount : 0), 0);
    const balance = totalIncome - totalExpenses;

    // Animated counters
    const animatedIncome = useCountUp(totalIncome, 1500);
    const animatedExpenses = useCountUp(totalExpenses, 1500);
    const animatedBalance = useCountUp(Math.abs(balance), 1500);

    // --- Recent Transactions (Last 5) ---
    const recentTransactions = expenses
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // --- Chart Data Preparation ---
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d);
        }
        return days;
    };

    const formatDateKey = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const expenseData = getLast7Days().map(day => {
        const dateKey = formatDateKey(day);
        const displayDate = day.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

        const dayAmount = Array.isArray(expenses) ? expenses
            .filter(item => item.type === 'expense' && item.date && item.date === dateKey)
            .reduce((sum, item) => sum + (Number(item.amount) || 0), 0) : 0;

        return {
            name: displayDate,
            amount: dayAmount
        };
    });

    // Category Data
    const categoryData = expenses
        .filter(item => item.type === 'expense')
        .reduce((acc, curr) => {
            const existing = acc.find(item => item.name === curr.category);
            if (existing) {
                existing.value += curr.amount;
            } else {
                acc.push({ name: curr.category, value: curr.amount });
            }
            return acc;
        }, []);

    const COLORS = ['#6366f1', '#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="pb-5">
            {/* Header with Welcome Message */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4 mb-md-5 animate-enter delay-100">
                <div>
                    <h1 className="display-4 fw-bold text-gradient mb-1 text-responsive-xl">
                        Hello, {user?.name || 'User'}!
                    </h1>
                    <p className="text-white-50 fs-6 fs-md-5 mb-0">Here's your financial overview.</p>
                </div>
                <div className="d-none d-lg-block text-end mt-3 mt-lg-0">
                    <div className="glass-card px-3 px-md-4 py-2 text-white d-inline-block">
                        <small className="text-uppercase ls-1 text-white-50" style={{ fontSize: '0.7rem' }}>Today</small>
                        <div className="fw-bold fs-6 fs-md-5">
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Cards Row */}
            <Row className="g-3 g-md-4 mb-4 mb-md-5 animate-enter delay-200">
                <Col xs={12} sm={6} lg={4}>
                    {isLoading ? <SkeletonCard /> : (
                        <div className="glass-card h-100 p-3 p-md-4 position-relative overflow-hidden">
                            <div className="position-absolute opacity-10" style={{ top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}></div>
                            <div className="position-relative z-1">
                                <span className="text-white-50 text-uppercase ls-1" style={{ fontSize: '0.75rem' }}>Total Income</span>
                                <div className="d-flex align-items-center mt-2 mb-2 mb-md-3">
                                    <h2 className="text-white fw-bold fs-2 fs-md-1 mb-0">₹{animatedIncome.toLocaleString('en-IN')}</h2>
                                </div>
                                <div className="d-flex align-items-center text-success bg-success-subtle px-2 py-1 rounded-pill d-inline-flex" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                                    <i className="bi bi-arrow-up-right me-1"></i>
                                    <small className="fw-semibold">Inflow</small>
                                </div>
                            </div>
                            <i className="bi bi-currency-rupee position-absolute" style={{ fontSize: '5rem', right: -10, bottom: -20, opacity: 0.1, transform: 'rotate(-15deg)', color: '#fff' }}></i>
                        </div>
                    )}
                </Col>
                <Col xs={12} sm={6} lg={4}>
                    {isLoading ? <SkeletonCard /> : (
                        <div className="glass-card h-100 p-3 p-md-4 position-relative overflow-hidden">
                            <div className="position-absolute opacity-10" style={{ top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}></div>
                            <div className="position-relative z-1">
                                <span className="text-white-50 text-uppercase ls-1" style={{ fontSize: '0.75rem' }}>Total Expenses</span>
                                <div className="d-flex align-items-center mt-2 mb-2 mb-md-3">
                                    <h2 className="text-white fw-bold fs-2 fs-md-1 mb-0">₹{animatedExpenses.toLocaleString('en-IN')}</h2>
                                </div>
                                <div className="d-flex align-items-center text-danger bg-danger-subtle px-2 py-1 rounded-pill d-inline-flex" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                                    <i className="bi bi-arrow-down-right me-1"></i>
                                    <small className="fw-semibold">Outflow</small>
                                </div>
                            </div>
                            <i className="bi bi-cart position-absolute" style={{ fontSize: '5rem', right: -10, bottom: -20, opacity: 0.1, transform: 'rotate(15deg)', color: '#fff' }}></i>
                        </div>
                    )}
                </Col>
                <Col xs={12} sm={12} lg={4}>
                    {isLoading ? <SkeletonCard /> : (
                        <div className="glass-card h-100 p-3 p-md-4 position-relative overflow-hidden">
                            <div className="position-absolute opacity-10" style={{ top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}></div>
                            <div className="position-relative z-1">
                                <span className="text-white-50 text-uppercase ls-1" style={{ fontSize: '0.75rem' }}>Available Balance</span>
                                <div className="d-flex align-items-center mt-2 mb-2 mb-md-3">
                                    <h2 className={`fw-bold fs-2 fs-md-1 mb-0 ${balance < 0 ? 'text-danger' : 'text-white'}`}>
                                        {balance < 0 ? '-' : ''}₹{animatedBalance.toLocaleString('en-IN')}
                                    </h2>
                                </div>
                                <div className="d-flex align-items-center text-info bg-info-subtle px-2 py-1 rounded-pill d-inline-flex" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                                    <i className="bi bi-wallet2 me-1"></i>
                                    <small className="fw-semibold">Current</small>
                                </div>
                            </div>
                            <i className="bi bi-piggy-bank position-absolute" style={{ fontSize: '5rem', right: -10, bottom: -20, opacity: 0.1, color: '#fff' }}></i>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Main Layout: Charts & Transactions */}
            <Row className="g-3 g-md-4 animate-enter delay-300">
                {/* Left Column: Charts */}
                <Col lg={8}>
                    {/* Activity Chart */}
                    <div className="glass-card p-3 p-md-4 mb-3 mb-md-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h5 className="text-white mb-0 fs-6 fs-md-5">Spending Trends</h5>
                                <small className="text-white-50" style={{ fontSize: '0.8rem' }}>Last 7 Days</small>
                            </div>
                        </div>
                        {isLoading ? <SkeletonChart /> : (
                            <>
                                <div style={{ height: '250px', width: '100%' }} className="d-none d-md-block">
                                    <ResponsiveContainer>
                                        <AreaChart data={expenseData}>
                                            <defs>
                                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                                            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} dx={-10} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff' }}
                                                formatter={(value) => [`₹${value}`, '']}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="amount"
                                                stroke="#818cf8"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorAmount)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Mobile Chart - Smaller */}
                                <div style={{ height: '200px', width: '100%' }} className="d-md-none">
                                    <ResponsiveContainer>
                                        <AreaChart data={expenseData}>
                                            <defs>
                                                <linearGradient id="colorAmountMobile" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} dy={10} />
                                            <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} dx={-10} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff' }}
                                                formatter={(value) => [`₹${value}`, '']}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="amount"
                                                stroke="#818cf8"
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill="url(#colorAmountMobile)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Recent Transactions List (New) */}
                    <div className="glass-card p-3 p-md-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="text-white mb-0 fs-6 fs-md-5">Recent Transactions</h5>
                            <Link to="/dashboard/expenses" className="btn btn-sm btn-outline-light rounded-pill px-3">View All</Link>
                        </div>
                        {isLoading ? (
                            <div className="text-center text-white-50 py-5">Loading transactions...</div>
                        ) : recentTransactions.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                                {recentTransactions.map((tx) => (
                                    <div key={tx.id} className="d-flex align-items-center justify-content-between p-2 p-md-3 rounded-3 rounded-md-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fs-6 fs-md-5"
                                                style={{ width: 36, height: 36, background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: tx.type === 'income' ? '#34d399' : '#f87171' }}>
                                                <i className={`bi ${tx.type === 'income' ? 'bi-arrow-down-left' : 'bi-arrow-up-right'}`}></i>
                                            </div>
                                            <div>
                                                <h6 className="text-white mb-0 text-capitalize fs-6">{tx.title}</h6>
                                                <small className="text-white-50" style={{ fontSize: '0.75rem' }}>{tx.category} • {new Date(tx.date).toLocaleDateString()}</small>
                                            </div>
                                        </div>
                                        <div className={`fw-bold fs-6 fs-md-5 ${tx.type === 'income' ? 'text-success' : 'text-white'}`}>
                                            {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-white-50 py-4">No recent transactions found.</div>
                        )}
                    </div>
                </Col>

                {/* Right Column: Breakdown */}
                <Col lg={4}>
                    <div className="glass-card p-3 p-md-4 h-100">
                        <h5 className="text-white mb-4 mb-md-5 fs-6 fs-md-5">Expense Breakdown</h5>
                        <div style={{ height: '250px', width: '100%', position: 'relative' }}>
                            {isLoading ? <SkeletonChart /> : categoryData.length > 0 ? (
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="45%"
                                            innerRadius={80}
                                            outerRadius={100}
                                            paddingAngle={8}
                                            dataKey="value"
                                            cornerRadius={8}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 text-white-50">
                                    No data available
                                </div>
                            )}

                            {/* Inner Circle Text */}
                            {!isLoading && categoryData.length > 0 && (
                                <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ marginTop: '-10px' }}>
                                    <small className="text-white-50 d-block text-uppercase ls-1" style={{ fontSize: '0.7rem' }}>Total</small>
                                    <span className="text-white fw-bold fs-5">₹{animatedExpenses.toLocaleString('en-IN')}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 d-flex flex-column gap-2">
                            {categoryData.slice(0, 5).map((entry, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length], marginRight: 10 }}></div>
                                        <span className="text-white-50 small">{entry.name}</span>
                                    </div>
                                    <span className="text-white fw-bold small">₹{entry.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Quick Add FAB */}
            <div className="position-fixed bottom-0 end-0 p-3 p-md-4 animate-enter delay-400" style={{ zIndex: 100 }}>
                <Link to="/dashboard/expenses" className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center shimmer-effect touch-target" style={{ width: 56, height: 56 }}>
                    <i className="bi bi-plus-lg fs-5 fs-md-4 text-white"></i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
