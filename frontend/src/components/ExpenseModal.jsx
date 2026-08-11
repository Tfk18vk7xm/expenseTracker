import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, FileText, AlignLeft } from 'lucide-react';

const CATEGORIES = [
  'Travel',
  'Food & Dining',
  'Office Supplies',
  'Software & SaaS',
  'Utilities',
  'Equipment',
  'Other',
];

const ExpenseModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAmount(initialData.amount || '');
      setCategory(initialData.category || CATEGORIES[0]);
      // Format YYYY-MM-DD
      const formattedDate = initialData.date
        ? new Date(initialData.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      setDate(formattedDate);
      setNotes(initialData.notes || '');
    } else {
      setTitle('');
      setAmount('');
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().split('T')[0]);
      setNotes('');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Valid positive amount is required');
      return;
    }
    if (!date) {
      setError('Date is required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onSubmit({
        title,
        amount: parseFloat(amount),
        category,
        date,
        notes,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{initialData ? 'Edit Expense' : 'Add New Expense'}</h3>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Title *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Flight to Tech Conference"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="input-field"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  className="input-field"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                className="select-field"
                style={{ width: '100%' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                className="input-field"
                rows="3"
                placeholder="Add optional context or reference IDs..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : initialData ? 'Update Expense' : 'Create Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
