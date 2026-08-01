// TODO: Replace dummy data using API
// TODO: Booking API

export const dummyBookings = [
  {
    id: "BK-9021",
    resortName: "Aura Ocean Breeze Sanctuary",
    location: "Maldives, South Atoll",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    checkIn: "2026-08-15",
    checkOut: "2026-08-20",
    guests: 2,
    totalPrice: 3250,
    status: "Confirmed"
  },
  {
    id: "BK-8840",
    resortName: "Serenity Alpine Chalet & Spa",
    location: "Zermatt, Switzerland",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    checkIn: "2026-11-10",
    checkOut: "2026-11-15",
    guests: 2,
    totalPrice: 2600,
    status: "Upcoming"
  },
  {
    id: "BK-7123",
    resortName: "Emerald Oasis Cliffside Estate",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    checkIn: "2026-04-02",
    checkOut: "2026-04-06",
    guests: 1,
    totalPrice: 1920,
    status: "Completed"
  }
];

export const dummyStats = {
  totalBookings: 12,
  upcomingTrips: 2,
  rewardsPoints: 14500,
  totalSpent: "$18,450"
};

export const dummyActivities = [
  { id: "act-1", title: "Booking Confirmed", description: "Aura Ocean Breeze Sanctuary for Aug 15 - Aug 20", time: "2 hours ago" },
  { id: "act-2", title: "Profile Updated", description: "Updated contact phone number", time: "1 day ago" },
  { id: "act-3", title: "Reward Points Earned", description: "+1,200 points added for Santorini trip", time: "3 days ago" }
];
