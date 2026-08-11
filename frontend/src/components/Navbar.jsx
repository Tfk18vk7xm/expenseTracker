import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="brand">
          <div className="brand-icon">
            <Wallet size={22} />
          </div>
          <span>Team Expense Tracker</span>
        </div>

        {user && (
          <div className="nav-user">
            <div className="user-badge">
              <UserIcon size={16} />
              <span>{user.name}</span>
            </div>

            <button onClick={logout} className="btn btn-secondary" title="Log Out">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
