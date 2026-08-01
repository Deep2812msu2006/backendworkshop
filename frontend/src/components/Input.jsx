import React from 'react';

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  className = '',
  name,
  id,
  disabled = false,
  ...props
}) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-sky-400">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full bg-slate-900/80 border text-slate-100 text-sm rounded-xl py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 ${
            Icon ? 'pl-10 pr-4' : 'px-4'
          } ${
            error
              ? 'border-red-500/80 focus:border-red-500'
              : 'border-slate-700/80 hover:border-slate-600 focus:border-sky-400'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
}
