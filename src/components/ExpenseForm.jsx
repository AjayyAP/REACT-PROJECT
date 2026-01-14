import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ExpenseForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                ...initialData,
                
                date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0]
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.amount || !formData.date) {
            return setError('Please fill in all required fields.');
        }

        if (parseFloat(formData.amount) <= 0) {
            return setError('Amount must be a positive number.');
        }

        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Amount</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Type</Form.Label>
                <Form.Select name="type" value={formData.type} onChange={handleChange}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Category</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Rent">Rent</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Salary">Salary (Income)</option>
                    <option value="Other">Other</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label className="text-white fw-bold">Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
                <Button variant="primary" type="submit">Save</Button>
            </div>
        </Form>
    );
};

export default ExpenseForm;
