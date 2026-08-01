import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98';

  const variants = {
    primary: 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 border border-sky-400/30',
    secondary: 'bg-slate-800/80 hover:bg-slate-700/80 text-sky-400 border border-slate-700 hover:border-sky-500/40 shadow-sm',
    outline: 'bg-transparent text-slate-200 border border-slate-600 hover:border-sky-400 hover:text-sky-400 hover:bg-sky-500/10',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
