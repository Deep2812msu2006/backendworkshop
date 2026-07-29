// TODO: Fetch Resorts from API
// Dummy dataset for Resort Booking Website

export const resortsData = [
  {
    id: "1",
    name: "Aura Ocean Breeze Sanctuary",
    location: "Maldives, South Atoll",
    price: 650,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perched over pristine turquoise ocean waters, Aura Ocean Breeze Sanctuary provides an unparalleled ultra-luxury experience with private infinity pools, glass-bottom villas, and personal butler services.",
    featured: true,
    facilities: ["Infinity Pool", "Private Beach", "Overwater Spa", "Free High-Speed Wi-Fi", "Gourmet Dining", "Helipad Access", "24/7 Butler"],
    reviews: [
      { id: "r1", user: "Sophia Turner", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", comment: "An absolute dream getaway! The overwater villa views took our breath away.", rating: 5, date: "July 2026" },
      { id: "r2", user: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", comment: "Unbelievable hospitality and world-class culinary experiences.", rating: 5, date: "June 2026" }
    ]
  },
  {
    id: "2",
    name: "Serenity Alpine Chalet & Spa",
    location: "Zermatt, Switzerland",
    price: 520,
    rating: 4.8,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Nestled at the base of snow-capped mountains, Serenity Alpine Chalet offers cozy timber interiors, outdoor heated hydro-pools, and panoramic views of the Swiss Alps.",
    featured: true,
    facilities: ["Heated Hydro Pool", "Ski-In Ski-Out", "Finnish Sauna", "Michelin Star Dining", "Fireplace Lounge", "Free Shuttle"],
    reviews: [
      { id: "r3", user: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", comment: "Soaking in the heated pool with snow falling around us was unforgettable.", rating: 5, date: "May 2026" }
    ]
  },
  {
    id: "3",
    name: "Emerald Oasis Cliffside Estate",
    location: "Santorini, Greece",
    price: 480,
    rating: 4.9,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Iconic whitewashed architecture overlooking the Mediterranean caldera. Features private plunge pools, sunset cocktail lounges, and wine tasting tours.",
    featured: true,
    facilities: ["Private Plunge Pool", "Caldera Sunset View", "Wine Tasting Cellar", "Airport Transfer", "Daily Champagne Breakfast"],
    reviews: [
      { id: "r4", user: "David Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", comment: "Best sunset view on the entire island!", rating: 5, date: "July 2026" }
    ]
  },
  {
    id: "4",
    name: "Azure Bamboo Jungle Retreat",
    location: "Ubud, Bali, Indonesia",
    price: 340,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Immerse yourself in lush rainforest canopy. Eco-friendly luxury suites with open-air stone tubs, holistic yoga pavilions, and farm-to-table organic dining.",
    featured: true,
    facilities: ["Jungle Infinity Pool", "Holistic Yoga Shala", "Organic Spa", "Farm-to-Table Restaurant", "Guided River Treks"],
    reviews: [
      { id: "r5", user: "Clara Bennett", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", comment: "Peaceful atmosphere and rejuvenating wellness programs.", rating: 5, date: "April 2026" }
    ]
  },
  {
    id: "5",
    name: "Royal Mirage Desert Oasis",
    location: "Dubai, United Arab Emirates",
    price: 780,
    rating: 4.95,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A palace in the sands. Experience opulent Arabian architecture, private dune safaris, private temperature-controlled pools, and royal suite amenities.",
    featured: true,
    facilities: ["Royal Hammam Spa", "Private Dune Tours", "Temperature Controlled Pool", "Valet Parking", "Luxury Yacht Charter"],
    reviews: [
      { id: "r6", user: "Tariq Al-Mansoor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80", comment: "7-star service quality and mesmerizing desert night skies.", rating: 5, date: "June 2026" }
    ]
  },
  {
    id: "6",
    name: "Whispering Palms Ocean Villa",
    location: "Maui, Hawaii, USA",
    price: 590,
    rating: 4.85,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Front-row Pacific oceanfront living. Private beach access, Hawaiian luau dinners, whale watching decks, and tropical garden suites.",
    featured: true,
    facilities: ["Direct Beach Access", "Whale Watching Deck", "Snorkeling Gear", "Hawaiian Luau Bar", "Free Parking"],
    reviews: [
      { id: "r7", user: "Jessica Miller", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", comment: "Falling asleep to the sound of crashing waves was heavenly.", rating: 5, date: "May 2026" }
    ]
  }
];

// Why Choose Us features
export const whyChooseUsData = [
  {
    id: "f1",
    title: "Handpicked Luxury",
    description: "Every resort is rigorously vetted for world-class standards, aesthetic design, and exceptional guest services.",
    iconName: "Sparkles"
  },
  {
    id: "f2",
    title: "Best Price Guarantee",
    description: "Enjoy exclusive rates and direct luxury booking perks with zero hidden commission fees.",
    iconName: "ShieldCheck"
  },
  {
    id: "f3",
    title: "24/7 Concierge Support",
    description: "Our dedicated concierge team is always available to handle custom requests, transfers, and reservations.",
    iconName: "Clock"
  },
  {
    id: "f4",
    title: "Flexible Cancellations",
    description: "Rest easy with flexible booking options, easy date changes, and hassle-free refund policies.",
    iconName: "RefreshCw"
  }
];

// Dummy dataset for Resort Events & Activities
// TODO: Create Event Activity API (Supabase Insert)
export const dummyEventsData = [

  {
    id: "evt-1",
    title: "Sunset Catamaran Champagne Cruise",
    resortName: "Aura Ocean Breeze Sanctuary",
    category: "Water Sports & Sailing",
    date: "2026-08-18",
    price: 180,
    maxParticipants: 12,
    description: "Sail into the golden horizon on a luxury yacht featuring champagne, fresh seafood, and live acoustic music."
  },
  {
    id: "evt-2",
    title: "Full Moon Beachside Luau & Gourmet Feast",
    resortName: "Whispering Palms Ocean Villa",
    category: "Culinary & Dining",
    date: "2026-08-20",
    price: 140,
    maxParticipants: 25,
    description: "An authentic Hawaiian luau under starry skies with traditional fire dancers and gourmet multi-course buffet."
  },
  {
    id: "evt-3",
    title: "Helicopter Alpine Skiing Expedition",
    resortName: "Serenity Alpine Chalet & Spa",
    category: "Adventure & Sports",
    date: "2026-11-12",
    price: 450,
    maxParticipants: 6,
    description: "Helicopter drop onto untouched powder snow peaks accompanied by certified Matterhorn mountain guides."
  }
];

