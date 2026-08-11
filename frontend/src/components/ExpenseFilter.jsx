import React from 'react';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Travel',
  'Food & Dining',
  'Office Supplies',
  'Software & SaaS',
  'Utilities',
  'Equipment',
  'Other',
];

const ExpenseFilter = ({ search, setSearch, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="controls-bar">
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="input-field"
          placeholder="Search expenses by title or notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <Filter size={18} style={{ color: 'var(--text-muted)' }} />
        <select
          className="select-field"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
