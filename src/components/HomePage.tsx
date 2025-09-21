import { useState } from 'react';
import { Play, Navigation, MapPin, Thermometer, Wind, Cloud } from 'lucide-react';
import { Card } from '@/components/ui/card';

const HomePage = ({ onScreenChange }: { onScreenChange?: (screen: 'navigation' | 'routes' | 'community' | 'profile') => void }) => {
  const [weather] = useState({
    temp: 72,
    condition: 'Partly Cloudy',
    windSpeed: 12,
    visibility: 10
  });

  const quickActions = [
    { icon: Navigation, label: 'Navigate', color: 'primary', action: () => onScreenChange?.('navigation') },
    { icon: MapPin, label: 'Find Route', color: 'accent', action: () => onScreenChange?.('routes') },
    { icon: Play, label: 'Start Ride', color: 'success', action: () => onScreenChange?.('navigation') },
  ];

  const recentRides = [
    { name: 'Mountain Loop', distance: '47 mi', time: '2h 15m', scenic: true },
    { name: 'Coast Highway', distance: '23 mi', time: '1h 30m', scenic: true },
    { name: 'City Commute', distance: '12 mi', time: '35m', scenic: false },
  ];

  return (
    <div className="pb-20 bg-gradient-hero min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-high-contrast">Good Morning, Rider</h1>
            <p className="text-foreground-secondary">Ready for your next adventure?</p>
          </div>
          <div className="status-online"></div>
        </div>
      </div>

      {/* Quick Start Ride */}
      <div className="px-6 mb-6">
        <button 
          onClick={() => onScreenChange?.('navigation')}
          className="w-full rider-button py-6 bg-gradient-primary"
        >
          <div className="flex items-center justify-center space-x-3">
            <Play size={28} />
            <span className="text-xl font-bold">Start Quick Ride</span>
          </div>
        </button>
      </div>

      {/* Weather Widget */}
      <div className="px-6 mb-6">
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud size={32} className="text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{weather.condition}</h3>
                <p className="text-foreground-secondary">Perfect riding weather</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{weather.temp}°F</div>
              <div className="flex items-center space-x-2 text-sm text-foreground-secondary">
                <Wind size={16} />
                <span>{weather.windSpeed} mph</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-high-contrast">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.action}
                className="glass-card touch-target flex flex-col items-center p-4 hover:bg-white/10 transition-all duration-200"
              >
                <Icon size={32} className={`text-${action.color} mb-2`} />
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Rides */}
      <div className="px-6">
        <h2 className="text-lg font-semibold mb-3 text-high-contrast">Recent Rides</h2>
        <div className="space-y-3">
          {recentRides.map((ride, index) => (
            <Card key={index} className="glass-card p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${ride.scenic ? 'bg-success' : 'bg-muted'}`}></div>
                  <div>
                    <h3 className="font-semibold">{ride.name}</h3>
                    <p className="text-sm text-foreground-secondary">{ride.distance} • {ride.time}</p>
                  </div>
                </div>
                <Play size={20} className="text-primary" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;