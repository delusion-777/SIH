import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, Clock, MapPin, Users, Gift, Trophy, Star } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'festival' | 'contest' | 'hackathon';
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  rewards: string[];
  participants: number;
  maxParticipants?: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  featured?: boolean;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Pongal Festival Farming Challenge',
    type: 'festival',
    date: '2025-01-15',
    time: '09:00 AM',
    duration: '3 days',
    location: 'Online Platform',
    description: 'Celebrate Pongal by showcasing traditional Tamil farming practices. Share photos of your harvest, traditional tools, and farming techniques.',
    rewards: ['500 Farmo Coins', 'Pongal Special Badge', 'Traditional Seeds Pack'],
    participants: 234,
    maxParticipants: 500,
    status: 'upcoming',
    featured: true
  },
  {
    id: '2',
    title: 'Organic Farming Webinar with Dr. Nammalvar',
    type: 'webinar',
    date: '2025-01-20',
    time: '02:00 PM',
    duration: '2 hours',
    location: 'Zoom Webinar',
    description: 'Learn from renowned organic farming expert about natural farming methods, soil health, and sustainable agriculture practices.',
    rewards: ['Knowledge Certificate', '100 Farmo Coins', 'Organic Farming eBook'],
    participants: 156,
    maxParticipants: 300,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Sankranti Seed Exchange Program',
    type: 'workshop',
    date: '2025-01-14',
    time: '10:00 AM',
    duration: '1 day',
    location: 'Community Centers across South India',
    description: 'Traditional seed exchange program during Makar Sankranti. Bring heirloom seeds and exchange with farmers from different regions.',
    rewards: ['Rare Seed Varieties', '200 Farmo Coins', 'Seed Preserver Badge'],
    participants: 89,
    maxParticipants: 150,
    status: 'upcoming',
    featured: true
  },
  {
    id: '4',
    title: 'Young Farmer Innovation Hackathon',
    type: 'hackathon',
    date: '2025-01-25',
    time: '09:00 AM',
    duration: '48 hours',
    location: 'Bangalore Tech Hub',
    description: 'Develop innovative solutions for sustainable farming challenges. Team up with young entrepreneurs and tech enthusiasts.',
    rewards: ['₹50,000 Prize Money', '1000 Farmo Coins', 'Startup Mentorship'],
    participants: 67,
    maxParticipants: 100,
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Best Organic Produce Contest',
    type: 'contest',
    date: '2025-01-18',
    time: '12:00 PM',
    duration: '1 week',
    location: 'Upload Platform',
    description: 'Show off your best organic produce! Upload photos of fruits, vegetables, and grains grown using organic methods.',
    rewards: ['Organic Farmer Title', '300 Farmo Coins', 'Premium Tool Set'],
    participants: 178,
    status: 'ongoing'
  },
  {
    id: '6',
    title: 'Traditional Water Harvesting Workshop',
    type: 'workshop',
    date: '2025-01-12',
    time: '09:00 AM',
    duration: '4 hours',
    location: 'Rural Development Center, Tamil Nadu',
    description: 'Learn to build traditional tank irrigation systems and implement rainwater harvesting in your community.',
    rewards: ['Water Warrior Badge', '150 Farmo Coins', 'Implementation Guide'],
    participants: 45,
    maxParticipants: 80,
    status: 'completed'
  },
  {
    id: '7',
    title: 'Onam Harvest Festival Celebration',
    type: 'festival',
    date: '2024-09-15',
    time: '08:00 AM',
    duration: '2 days',
    location: 'Kerala Farmers Association',
    description: 'Celebrated Kerala\'s traditional harvest festival with farmers across the state. Shared traditional recipes and farming stories.',
    rewards: ['Onam Special Badge', '250 Farmo Coins', 'Kerala Seeds Pack'],
    participants: 312,
    status: 'completed'
  }
];

export function EventsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'upcoming', label: 'Upcoming', count: events.filter(e => e.status === 'upcoming').length },
    { id: 'ongoing', label: 'Live Now', count: events.filter(e => e.status === 'ongoing').length },
    { id: 'webinar', label: 'Webinars', count: events.filter(e => e.type === 'webinar').length },
    { id: 'festival', label: 'Festivals', count: events.filter(e => e.type === 'festival').length }
  ];

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : selectedFilter === 'upcoming' || selectedFilter === 'ongoing'
      ? events.filter(event => event.status === selectedFilter)
      : events.filter(event => event.type === selectedFilter);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'webinar': return '🎓';
      case 'workshop': return '🔨';
      case 'festival': return '🎉';
      case 'contest': return '🏆';
      case 'hackathon': return '💻';
      default: return '📅';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800 animate-pulse';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isEventSoon = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const timeDiff = eventDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff > 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-amber-800">Events & Workshops</h1>
        <p className="text-amber-600 max-w-2xl mx-auto">
          Join festivals, webinars, and workshops celebrating sustainable farming. 
          Connect with fellow farmers and learn from agricultural experts across India.
        </p>
      </div>

      {/* Event Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center space-x-2 ${
              selectedFilter === filter.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            <span>{filter.label}</span>
            <Badge variant="secondary" className="bg-white/20 text-xs">
              {filter.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Featured Events */}
      {selectedFilter === 'all' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-800">Featured Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.filter(event => event.featured).map(event => (
              <Card 
                key={event.id}
                className="border-amber-300 bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-amber-800">
                    <Star size={12} className="mr-1" />
                    Featured
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                    <Badge variant="outline" className="text-amber-600 border-amber-300 capitalize">
                      {event.type}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-amber-800">{event.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-amber-700">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-amber-600">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600">
                      <Clock size={16} />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600">
                      <MapPin size={16} />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600">
                      <Users size={16} />
                      <span>{event.participants}{event.maxParticipants && `/${event.maxParticipants}`} participants</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-800 flex items-center">
                      <Gift size={16} className="mr-2" />
                      Rewards:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.rewards.map((reward, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-amber-200 text-amber-800 text-xs"
                        >
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    {event.status === 'upcoming' ? 'Register Now' :
                     event.status === 'ongoing' ? 'Join Event' : 'View Results'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Events Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-amber-800">
          {selectedFilter === 'all' ? 'All Events' : 
           filters.find(f => f.id === selectedFilter)?.label || 'Events'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <Card 
              key={event.id}
              className={`border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                isEventSoon(event.date) ? 'ring-2 ring-orange-300' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                    <Badge variant="outline" className="text-amber-600 border-amber-300 capitalize">
                      {event.type}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-amber-800 leading-tight">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-amber-700 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 text-xs text-amber-600">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>{event.time} ({event.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={14} />
                    <span>{event.participants}{event.maxParticipants && `/${event.maxParticipants}`} joined</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-semibold text-amber-800">Rewards:</h5>
                  <div className="flex flex-wrap gap-1">
                    {event.rewards.slice(0, 2).map((reward, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-amber-200 text-amber-800 text-xs"
                      >
                        {reward}
                      </Badge>
                    ))}
                    {event.rewards.length > 2 && (
                      <Badge variant="secondary" className="bg-amber-200 text-amber-800 text-xs">
                        +{event.rewards.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button 
                  size="sm"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={event.status === 'completed'}
                >
                  {event.status === 'upcoming' ? 'Register' :
                   event.status === 'ongoing' ? 'Join Now' : 'View Results'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* No Events Message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-amber-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-amber-800 mb-2">No events found</h3>
          <p className="text-amber-600">Check back soon for new events and workshops!</p>
        </div>
      )}
    </div>
  );
}