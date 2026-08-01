import React from 'react';
import * as Icons from 'lucide-react';

export function FeatureCard({ title, description, iconName }) {
  const IconComponent = Icons[iconName] || Icons.Sparkles;

  return (
    <div className="glass-card rounded-2xl p-6 glass-card-hover border border-slate-800 flex flex-col gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-md">
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
