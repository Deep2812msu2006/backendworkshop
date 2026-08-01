import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Compass, ArrowRight, ShieldCheck, Sparkles, Award, Waves, Utensils, Wifi, Tv } from 'lucide-react';
import { Button } from '../components/Button';
import { ResortCard } from '../components/ResortCard';
import { FeatureCard } from '../components/FeatureCard';
import { ReviewCard } from '../components/ReviewCard';
import { SectionTitle } from '../components/SectionTitle';
import { resortsData, whyChooseUsData } from '../data/resorts';

// TODO: Fetch Resorts from API
export function HomePage() {
  const navigate = useNavigate();
  const featuredResorts = resortsData.slice(0, 6);

  const amenitiesList = [
    { title: "Infinity Pools", icon: Waves, description: "Temperature controlled overwater & oceanfront pools." },
    { title: "Gourmet Dining", icon: Utensils, description: "Michelin-starred culinary creations from global chefs." },
    { title: "High-Speed Wi-Fi", icon: Wifi, description: "Seamless fiber-optic connectivity across all villas." },
    { title: "Smart Entertainment", icon: Tv, description: "In-suite cinema systems and high-fidelity audio." }
  ];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate('/resorts');
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-10 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Resort Hero"
            className="w-full h-full object-cover scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-sky-400/30 text-sky-400 text-xs font-semibold uppercase tracking-widest animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>World-Class Luxury Destinations</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            Escape to Pure <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Paradise</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Indulge in handpicked ultra-luxury villas, breathtaking overwater sanctuaries, and private island retreats designed for unforgettable experiences.
          </p>

          {/* Floating Hero Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="glass-panel p-4 sm:p-6 rounded-3xl border border-sky-500/20 max-w-4xl mx-auto shadow-2xl space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4 text-left"
          >
            <div className="flex-1 space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Destination
              </label>
              <input
                type="text"
                placeholder="Maldives, Switzerland, Bali..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="flex-1 space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                Dates
              </label>
              <input
                type="date"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="pt-2 sm:pt-0 sm:self-end">
              <Button type="submit" size="lg" variant="primary" icon={Search} className="w-full sm:w-auto">
                Explore Resorts
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. FEATURED RESORTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <SectionTitle
            subtitle="Curated Sanctuaries"
            title="Featured Luxury Resorts"
            className="mb-0"
          />
          <Link to="/resorts" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              View All Resorts
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResorts.map((resort) => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Unmatched Excellence"
          title="Why Choose Aura Resorts"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              iconName={feature.iconName}
            />
          ))}
        </div>
      </section>

      {/* 4. LUXURY AMENITIES */}
      <section className="glass-panel py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Five-Star Standards"
            title="Signature Resort Amenities"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenitiesList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Guest Stories"
          title="What Our Visitors Say"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resortsData.flatMap(r => r.reviews).slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-10 md:p-16 border border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 text-center relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10" />
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Ready to Experience True Luxury?
          </h2>
          <p className="max-w-xl mx-auto text-slate-300 text-base">
            Book your dream resort villa today and unlock VIP welcome gifts, complimentary spa credits, and personal butler transfers.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/resorts">
              <Button size="lg" variant="primary" icon={Compass}>
                Find Your Sanctuary
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Concierge
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
