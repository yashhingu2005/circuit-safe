import { useState } from 'react';
import { MapPin, Navigation, Star, Clock, Zap, Filter, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Route {
  id: string;
  name: string;
  distance: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  rating: number;
  scenic: boolean;
  description: string;
  waypoints: number;
}

const RouteScreen = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'saved' | 'create'>('discover');
  
  const [routes] = useState<Route[]>([
    {
      id: '1',
      name: 'Pacific Coast Highway',
      distance: '47.2 mi',
      duration: '2h 15m',
      difficulty: 'Moderate',
      rating: 4.8,
      scenic: true,
      description: 'Breathtaking coastal views with winding roads and perfect photo stops.',
      waypoints: 5
    },
    {
      id: '2',
      name: 'Mountain Vista Loop',
      distance: '62.1 mi',
      duration: '3h 30m',
      difficulty: 'Hard',
      rating: 4.9,
      scenic: true,
      description: 'Challenging mountain roads with elevation changes and stunning vistas.',
      waypoints: 8
    },
    {
      id: '3',
      name: 'City Explorer',
      distance: '23.4 mi',
      duration: '1h 45m',
      difficulty: 'Easy',
      rating: 4.2,
      scenic: false,
      description: 'Urban adventure through historic districts and local landmarks.',
      waypoints: 12
    }
  ]);

  const getDifficultyColor = (difficulty: Route['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'text-success';
      case 'Moderate': return 'text-warning';
      case 'Hard': return 'text-destructive';
      default: return 'text-muted';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted'} 
      />
    ));
  };

  const handleStartRoute = (routeId: string) => {
    console.log(`Starting route ${routeId}`);
  };

  return (
    <div className="pb-20 bg-gradient-hero min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-high-contrast">Routes</h1>
          <button className="map-control">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 mb-6">
        <div className="flex bg-background-secondary/50 rounded-xl p-1">
          {[
            { key: 'discover', label: 'Discover', icon: MapPin },
            { key: 'saved', label: 'Saved', icon: Star },
            { key: 'create', label: 'Create', icon: Plus }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground-muted hover:text-foreground'
                  }
                `}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="glass-card p-3 text-center">
            <div className="text-2xl font-bold text-primary">47</div>
            <div className="text-xs text-foreground-secondary">Routes Completed</div>
          </Card>
          <Card className="glass-card p-3 text-center">
            <div className="text-2xl font-bold text-success">1,234</div>
            <div className="text-xs text-foreground-secondary">Miles Ridden</div>
          </Card>
          <Card className="glass-card p-3 text-center">
            <div className="text-2xl font-bold text-warning">4.8</div>
            <div className="text-xs text-foreground-secondary">Avg Rating</div>
          </Card>
        </div>
      </div>

      {/* Routes List */}
      <div className="px-6 space-y-4">
        {routes.map((route) => (
          <Card key={route.id} className="glass-card p-5">
            {/* Route Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold text-foreground">{route.name}</h3>
                  {route.scenic && (
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(route.rating)}
                  <span className="text-sm text-foreground-secondary ml-1">
                    {route.rating}
                  </span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(route.difficulty)} bg-current/10`}>
                {route.difficulty}
              </div>
            </div>

            {/* Route Stats */}
            <div className="flex items-center space-x-4 mb-3 text-sm text-foreground-secondary">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{route.distance}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{route.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Navigation size={14} />
                <span>{route.waypoints} stops</span>
              </div>
            </div>

            {/* Route Description */}
            <p className="text-foreground-secondary text-sm mb-4">
              {route.description}
            </p>

            {/* Route Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleStartRoute(route.id)}
                className="flex-1 rider-button bg-gradient-primary py-3"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Navigation size={18} />
                  <span>Start Route</span>
                </div>
              </button>
              <button className="touch-target px-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors duration-200">
                <Star size={20} className="text-foreground-muted" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Route Button */}
      {activeTab === 'create' && (
        <div className="px-6 mt-6">
          <button className="w-full rider-button bg-gradient-to-r from-accent to-orange-500 py-4">
            <div className="flex items-center justify-center space-x-3">
              <Plus size={24} />
              <span className="text-lg font-bold">Create New Route</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default RouteScreen;