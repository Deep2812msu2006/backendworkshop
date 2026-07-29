import React from 'react';
import { Star, Quote } from 'lucide-react';

export function ReviewCard({ review }) {
  return (
    <div className="glass-card rounded-2xl p-6 glass-card-hover border border-slate-800 flex flex-col justify-between h-full relative">
      <Quote className="w-8 h-8 text-sky-500/20 absolute top-4 right-4" />
      <div>
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">
          "{review.comment}"
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
        <img
          src={review.avatar}
          alt={review.user}
          className="w-10 h-10 rounded-full object-cover border border-sky-400/40"
        />
        <div>
          <h4 className="text-sm font-semibold text-white">{review.user}</h4>
          <span className="text-xs text-slate-400">{review.date}</span>
        </div>
      </div>
    </div>
  );
}
