import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-panel p-10 rounded-3xl border border-sky-500/20 text-center space-y-6 shadow-2xl">
        
        {/* Animated Compass Icon */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-sky-500/20 border-t-sky-400 rounded-full animate-spin" />
          <Compass className="w-12 h-12 text-sky-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-sky-400 tracking-wider">404</span>
          <h1 className="text-2xl font-bold text-white">Island Sanctuary Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            The page or resort villa URL you are looking for has been moved, renamed, or does not exist on our map.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link to="/">
            <Button size="md" variant="primary" icon={Home} className="w-full">
              Go Back Home
            </Button>
          </Link>
          <Link to="/resorts">
            <Button size="md" variant="outline" icon={ArrowLeft} className="w-full">
              Explore All Resorts
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
