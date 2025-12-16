import { useParams, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const TransactionDetails = () => {
    const { id } = useParams();
    const { expenses } = useExpenses();
    const navigate = useNavigate();

    const transaction = expenses.find(item => item.id === id);

    if (!transaction) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-50 text-white-50">
                <i className="bi bi-search fs-1 mb-3 opacity-50"></i>
                <h3>Transaction not found</h3>
                <Button variant="link" className="text-decoration-none text-gradient fw-bold" onClick={() => navigate('/dashboard/expenses')}>
                    <i className="bi bi-arrow-left me-2"></i> Back to Activity
                </Button>
            </div>
        );
    }

    return (
        <Container className="py-3 py-md-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
                style={{ maxWidth: '700px' }}
            >
                <Button variant="link" className="text-decoration-none text-white-50 hover-text-white mb-3 mb-md-4 p-0 d-flex align-items-center gap-2 touch-target" onClick={() => navigate('/dashboard/expenses')}>
                    <div className="rounded-circle bg-white bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                        <i className="bi bi-arrow-left"></i>
                    </div>
                    Back to List
                </Button>

                <Card className="glass-card border-0 p-0 overflow-hidden shadow-2xl">
                    <div className="position-absolute top-0 start-0 w-100 h-1" style={{ background: `linear-gradient(90deg, ${transaction.type === 'income' ? '#22c55e' : '#ef4444'}, transparent)` }}></div>

                    <Card.Body className="p-3 p-md-4 p-lg-5">
                        <div className="text-center mb-4 mb-md-5">
                            <div className={`d-inline-flex p-3 rounded-circle mb-3 ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'} bg-opacity-10 text-${transaction.type === 'income' ? 'success' : 'danger'}`}>
                                <i className={`bi ${transaction.type === 'income' ? 'bi-arrow-down-left' : 'bi-arrow-up-right'} fs-3 fs-md-2`}></i>
                            </div>
                            <h6 className="text-uppercase text-white-50 ls-2 small fw-bold mb-2" style={{ fontSize: '0.7rem' }}>Transaction Receipt</h6>
                            <h1 className="display-4 fw-bold text-white mb-0 text-responsive-xl">{transaction.title}</h1>
                        </div>

                        <div className="glass-card p-3 p-md-4 rounded-3 rounded-md-4 mb-3 mb-md-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <Row className="gy-4 align-items-center">
                                <Col xs={12} className="text-center border-bottom border-white border-opacity-10 pb-3 pb-md-4">
                                    <small className="text-secondary d-block mb-1 text-uppercase ls-1">Total Amount</small>
                                    <h2 className={`display-4 display-md-3 fw-bold mb-0 ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                                        {transaction.type === 'income' ? '+' : '-'}₹{parseFloat(transaction.amount).toFixed(2)}
                                    </h2>
                                </Col>
                                <Col xs={6}>
                                    <small className="text-secondary d-block mb-1 text-uppercase ls-1" style={{ fontSize: '0.7rem' }}>Category</small>
                                    <span className="fs-6 fs-md-5 text-white fw-medium d-flex align-items-center gap-2">
                                        <i className="bi bi-tag-fill opacity-50 text-primary"></i>
                                        {transaction.category}
                                    </span>
                                </Col>
                                <Col xs={6} className="text-end">
                                    <small className="text-secondary d-block mb-1 text-uppercase ls-1" style={{ fontSize: '0.7rem' }}>Date</small>
                                    <span className="fs-6 fs-md-5 text-white fw-medium">
                                        {new Date(transaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </Col>
                            </Row>
                        </div>

                        <div className="d-flex justify-content-between align-items-center text-white-50 small font-monospace">
                            <span>ID: {transaction.id.substring(0, 8)}...</span>
                            <span>{new Date(transaction.createdAt || Date.now()).toLocaleTimeString()}</span>
                        </div>
                    </Card.Body>
                </Card>
            </motion.div>
        </Container>
    );
};

export default TransactionDetails;
