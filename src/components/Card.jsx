import React from 'react';

export function Card({ children, className = '', hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'glass-card-hover' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
