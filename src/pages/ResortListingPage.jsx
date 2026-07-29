import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Star, DollarSign, X } from 'lucide-react';
import { ResortCard } from '../components/ResortCard';
import { SectionTitle } from '../components/SectionTitle';
import { Loader } from '../components/Loader';
import { useResorts } from '../hooks/useResorts';

// TODO: Fetch Resorts from API
export function ResortListingPage() {
  const { resorts, loading } = useResorts();
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  // Filtering logic
  const filteredResorts = resorts.filter((resort) => {
    const matchesSearch =
      resort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resort.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = resort.price <= maxPrice;
    const matchesRating = resort.rating >= minRating;

    return matchesSearch && matchesPrice && matchesRating;
  });

  const handleReset = () => {
    setSearchTerm('');
    setMaxPrice(1000);
    setMinRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <SectionTitle
          subtitle="Explore Destinations"
          title="Exclusive Resort Collection"
          centered
        />
        <p className="text-slate-400 text-sm -mt-6">
          Filter through pristine island retreats, alpine chalets, and desert estates.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-sky-400" />
              Search Resort / Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. Maldives, Santorini, Swiss..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                Max Price per Night
              </span>
              <span className="text-sky-400 font-bold text-sm">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>$300</span>
              <span>$650</span>
              <span>$1,000+</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">4.5 Stars & Above</option>
              <option value="4.8">4.8 Stars & Above</option>
              <option value="4.9">4.9+ VIP Rating</option>
            </select>
          </div>

        </div>

        {/* Filter Summary & Reset */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>
            Showing <strong className="text-sky-400">{filteredResorts.length}</strong> of {resorts.length} luxury resorts
          </span>
          {(searchTerm || maxPrice < 1000 || minRating > 0) && (
            <button
              onClick={handleReset}
              className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Resorts Grid */}
      {loading ? (
        <Loader text="Fetching luxury resort collection..." />
      ) : filteredResorts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResorts.map((resort) => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Resorts Match Your Criteria</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms or lowering your minimum price/rating filters.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-sky-500/20 text-sky-400 rounded-xl text-sm font-semibold hover:bg-sky-500/30 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
