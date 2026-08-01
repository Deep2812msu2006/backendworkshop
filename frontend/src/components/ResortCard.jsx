import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export function ResortCard({ resort }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden glass-card-hover border border-slate-800 flex flex-col group">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={resort.image}
          alt={resort.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-amber-400 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{resort.rating}</span>
          <span className="text-slate-400 font-normal">({resort.reviewsCount})</span>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-slate-300 text-xs font-medium bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-700/50">
          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="truncate max-w-[200px]">{resort.location}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
            {resort.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {resort.description}
          </p>
        </div>

        {/* Facilities Preview */}
        <div className="flex flex-wrap gap-1.5">
          {resort.facilities?.slice(0, 3).map((facility, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
            >
              {facility}
            </span>
          ))}
          {resort.facilities?.length > 3 && (
            <span className="text-[11px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded-md border border-sky-500/20">
              +{resort.facilities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-slate-400 block">Starting from</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-extrabold text-sky-400">${resort.price}</span>
              <span className="text-xs text-slate-400">/ night</span>
            </div>
          </div>

          <Link to={`/resorts/${resort.id}`}>
            <Button size="sm" variant="primary" icon={ArrowRight}>
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
