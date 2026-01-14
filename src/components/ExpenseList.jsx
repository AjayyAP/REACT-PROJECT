import { Table, Button, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
    if (!expenses || expenses.length === 0) {
        return (
            <div className="text-center p-5 glass-card text-white-50">
                <i className="bi bi-inbox fs-1 mb-3 d-block opacity-50"></i>
                <span className="text-uppercase ls-1">No transactions found. Add one!</span>
            </div>
        );
    }

    return (
        <div className="expense-list-container">

            <div className="d-none d-md-block table-responsive rounded-4 overflow-hidden">
                <Table hover variant="dark" className="align-middle mb-0" style={{ backgroundColor: 'transparent' }}>
                    <thead className="bg-white bg-opacity-10 text-white text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                        <tr>
                            <th className="py-4 ps-4 border-0">Date</th>
                            <th className="py-4 border-0">Title</th>
                            <th className="py-4 border-0">Category</th>
                            <th className="py-4 border-0">Type</th>
                            <th className="py-4 border-0">Amount</th>
                            <th className="py-4 pe-4 border-0 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="border-top-0">
                        <AnimatePresence>
                            {expenses.map((expense) => (
                                <motion.tr
                                    key={expense.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                                    className="transition-all"
                                >
                                    <td className="bg-transparent py-3 ps-4 text-white-50">{new Date(expense.date).toLocaleDateString()}</td>
                                    <td className="bg-transparent py-3 fw-bold text-white">{expense.title}</td>
                                    <td className="bg-transparent py-3 text-info opacity-75">{expense.category}</td>
                                    <td className="bg-transparent py-3">
                                        <Badge bg={expense.type === 'income' ? 'success' : 'danger'} className="bg-opacity-25 text-white fw-normal px-3 py-2 rounded-pill border border-white border-opacity-10">
                                            {expense.type}
                                        </Badge>
                                    </td >
                                    <td className={`bg-transparent py-3 fw-bold fs-5 ${expense.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                        {expense.type === 'income' ? '+' : '-'} ₹{parseFloat(expense.amount).toFixed(2)}
                                    </td>
                                    <td className="bg-transparent py-3 pe-4 text-end">
                                        <Button variant="link" size="sm" className="text-decoration-none text-white-50 hover-text-primary p-0 me-3" onClick={() => onEdit(expense)}>
                                            <i className="bi bi-pencil-square fs-5"></i>
                                        </Button>
                                        <Button variant="link" size="sm" className="text-decoration-none text-white-50 hover-text-danger p-0" onClick={() => onDelete(expense.id)}>
                                            <i className="bi bi-trash fs-5"></i>
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </Table>
            </div>


            <div className="d-md-none d-flex flex-column gap-3">
                <AnimatePresence>
                    {expenses.map((expense) => (
                        <motion.div
                            key={expense.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-card p-3 position-relative overflow-hidden"
                            style={{ borderRadius: '16px', background: 'rgba(17, 24, 39, 0.6)' }}
                        >
                            <div className={`position-absolute top-0 start-0 h-100 ${expense.type === 'income' ? 'bg-success' : 'bg-danger'}`} style={{ width: '4px', opacity: 0.8 }}></div>

                            <div className="d-flex justify-content-between align-items-start mb-2 ps-2">
                                <div>
                                    <h6 className="fw-bold text-white mb-1" style={{ fontSize: '1.1rem' }}>{expense.title}</h6>
                                    <small className="text-white-50">{new Date(expense.date).toLocaleDateString()}</small>
                                </div>
                                <span className={`fw-bold fs-4 ${expense.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                    {expense.type === 'income' ? '+' : '-'}₹{parseFloat(expense.amount).toFixed(2)}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center ps-2 mt-3">
                                <Badge bg="dark" className="border border-secondary border-opacity-25 text-white-50 fw-normal px-2 py-1">
                                    <i className="bi bi-tag-fill me-1 opacity-50"></i> {expense.category}
                                </Badge>

                                <div className="d-flex gap-2">
                                    <Button variant="outline-primary" size="sm" className="rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: 32, height: 32 }} onClick={() => onEdit(expense)}>
                                        <i className="bi bi-pencil-fill" style={{ fontSize: '0.8rem' }}></i>
                                    </Button>
                                    <Button variant="outline-danger" size="sm" className="rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: 32, height: 32 }} onClick={() => onDelete(expense.id)}>
                                        <i className="bi bi-trash-fill" style={{ fontSize: '0.8rem' }}></i>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExpenseList;
