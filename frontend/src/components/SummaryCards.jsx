import React from 'react';
import { DollarSign, Calendar, Tag, CreditCard } from 'lucide-react';

const SummaryCards = ({ summary }) => {
  const totalSpent = summary?.totalSpent || 0;
  const monthSpent = summary?.monthSpent || 0;
  const totalCount = summary?.totalCount || 0;
  
  const topCategory = summary?.categoryBreakdown && summary.categoryBreakdown.length > 0
    ? summary.categoryBreakdown[0].category
    : 'None';

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-icon total">
          <DollarSign size={26} />
        </div>
        <div className="summary-info">
          <h4>Total Expenses</h4>
          <div className="value">{formatCurrency(totalSpent)}</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon month">
          <Calendar size={26} />
        </div>
        <div className="summary-info">
          <h4>This Month</h4>
          <div className="value">{formatCurrency(monthSpent)}</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon category">
          <Tag size={26} />
        </div>
        <div className="summary-info">
          <h4>Top Category</h4>
          <div className="value" style={{ fontSize: '1.3rem' }}>{topCategory}</div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon count">
          <CreditCard size={26} />
        </div>
        <div className="summary-info">
          <h4>Total Items</h4>
          <div className="value">{totalCount}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
