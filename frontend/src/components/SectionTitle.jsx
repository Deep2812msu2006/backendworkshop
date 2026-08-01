import React from 'react';

export function SectionTitle({ title, subtitle, centered = false, className = '' }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <span className="text-sky-400 text-xs font-bold uppercase tracking-widest bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full inline-block mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      <div className={`mt-3 h-1 w-16 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}
