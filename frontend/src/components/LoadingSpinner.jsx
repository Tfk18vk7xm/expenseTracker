import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-wrapper">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div className="spinner"></div>
        {text && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</span>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
