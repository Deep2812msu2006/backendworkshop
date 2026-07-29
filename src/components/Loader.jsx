import React from 'react';
import { Compass } from 'lucide-react';

export function Loader({ text = "Loading resort details..." }) {
  return (
    <div className="min-h-[300px] w-full flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-sky-500/20 border-t-sky-400 rounded-full animate-spin"></div>
        <Compass className="w-6 h-6 text-sky-400 absolute animate-pulse" />
      </div>
      <p className="text-sm font-medium text-slate-400 tracking-wide">{text}</p>
    </div>
  );
}
