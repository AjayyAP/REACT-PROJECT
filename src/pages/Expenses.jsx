import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

const Expenses = () => {
    const { expenses, addExpense, deleteExpense, updateExpense } = useExpenses();
    const [showModal, setShowModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    const handleClose = () => {
        setShowModal(false);
        setEditingExpense(null);
    };

    const handleShow = () => setShowModal(true);

    const handleSubmit = async (data) => {
        if (editingExpense) {
            await updateExpense(editingExpense.id, data);
        } else {
            await addExpense(data);
        }
        handleClose();
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        handleShow();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await deleteExpense(id);
        }
    };

    return (
        <div className="pb-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 animate-enter">
                <div>
                    <h1 className="display-4 fw-bold text-gradient mb-1">My Activity</h1>
                    <p className="text-white-50 fs-5 mb-0">Manage your transactions efficiently.</p>
                </div>
                <Button
                    variant="primary"
                    onClick={handleShow}
                    className="mt-4 mt-md-0 px-4 py-3 rounded-4 shadow-lg hover-glow d-flex align-items-center justify-content-center gap-2 border-0"
                    style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' }}
                >
                    <i className="bi bi-plus-lg fs-5"></i>
                    <span className="fw-bold">Add Transaction</span>
                </Button>
            </div>

            <Card className="glass-card p-0 border-0 overflow-hidden animate-enter delay-200">
                <Card.Body className="p-0">
                    <ExpenseList
                        expenses={expenses}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose} centered contentClassName="glass-card border-0">
                <Modal.Header closeButton className="border-bottom border-secondary border-opacity-10">
                    <Modal.Title className="text-white fw-bold">{editingExpense ? 'Edit Transaction' : 'New Transaction'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <ExpenseForm
                        onSubmit={handleSubmit}
                        initialData={editingExpense || {}}
                        onCancel={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Expenses;
