import React, { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/api';
import SummaryCards from '../components/SummaryCards';
import ExpenseFilter from '../components/ExpenseFilter';
import ExpenseList from '../components/ExpenseList';
import ExpenseModal from '../components/ExpenseModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { Plus, RefreshCw } from 'lucide-react';

const DashboardPage = ({ addToast }) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [expensesRes, summaryRes] = await Promise.all([
        expenseService.getExpenses({ category: selectedCategory, search }),
        expenseService.getSummary(),
      ]);

      if (expensesRes.success) {
        setExpenses(expensesRes.data);
      }
      if (summaryRes.success) {
        setSummary(summaryRes.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load dashboard data.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, search, addToast]);

  // Debounced search / filter trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDashboardData();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchDashboardData]);

  const handleOpenAddModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleSaveExpense = async (formData) => {
    if (editingExpense) {
      const res = await expenseService.updateExpense(editingExpense.id, formData);
      if (res.success) {
        addToast('Expense updated successfully.', 'success');
      }
    } else {
      const res = await expenseService.createExpense(formData);
      if (res.success) {
        addToast('Expense added successfully.', 'success');
      }
    }
    fetchDashboardData();
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense entry?')) {
      try {
        const res = await expenseService.deleteExpense(id);
        if (res.success) {
          addToast('Expense entry deleted.', 'success');
          fetchDashboardData();
        }
      } catch (err) {
        addToast(err.response?.data?.message || 'Failed to delete expense.', 'error');
      }
    }
  };

  return (
    <div className="main-content">
      {/* Dashboard Top Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Financial Dashboard</h2>
          <p>Track team expenses, monitor category spending, and manage reimbursements.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchDashboardData} className="btn btn-secondary" title="Refresh Data">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>

          <button onClick={handleOpenAddModal} className="btn btn-primary">
            <Plus size={18} />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Filter and Search Controls */}
      <ExpenseFilter
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Expense List Data Table */}
      {loading ? (
        <LoadingSpinner text="Fetching expense items..." />
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteExpense}
        />
      )}

      {/* Add / Edit Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveExpense}
        initialData={editingExpense}
      />
    </div>
  );
};

export default DashboardPage;
