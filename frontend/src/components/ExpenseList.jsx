import React from 'react';
import { Edit2, Trash2, Receipt } from 'lucide-react';

const getCategoryBadgeClass = (category) => {
  const cat = category ? category.toLowerCase() : '';
  if (cat.includes('travel')) return 'badge-travel';
  if (cat.includes('food')) return 'badge-food';
  if (cat.includes('office')) return 'badge-office';
  if (cat.includes('software')) return 'badge-software';
  if (cat.includes('utilit')) return 'badge-utilities';
  return 'badge-other';
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <Receipt className="empty-state-icon" />
          <h3>No expenses found</h3>
          <p>Get started by clicking "Add Expense" or adjusting your search filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Notes</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item) => (
            <tr key={item.id}>
              <td>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</span>
              </td>
              <td>
                <span className={`badge ${getCategoryBadgeClass(item.category)}`}>
                  {item.category}
                </span>
              </td>
              <td>
                <span style={{ fontWeight: '700', color: 'var(--accent)' }}>
                  {formatCurrency(item.amount)}
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>{formatDate(item.date)}</td>
              <td style={{ color: 'var(--text-muted)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.notes || '—'}
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => onEdit(item)}
                    className="btn-icon"
                    title="Edit Expense"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn-icon"
                    style={{ color: 'var(--danger)' }}
                    title="Delete Expense"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
