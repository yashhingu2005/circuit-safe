import { useState } from 'react';
import { 
  Navigation, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Zap, 
  MapPin, 
  Clock,
  ArrowRight,
  Home
} from 'lucide-react';

const NavigationScreen = ({ onScreenChange }: { onScreenChange?: (screen: 'home') => void }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeed] = useState(45);
  const [speedLimit] = useState(55);

  const navigationData = {
    nextTurn: 'Turn right onto Highway 101',
    distance: '0.3 mi',
    eta: '2:35 PM',
    remaining: '12 min',
    totalDistance: '8.4 miles'
  };

  return (
    <div className="fixed inset-0 bg-background">
      {/* Map Area (Simulated) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background-secondary">
        {/* Simulated map with route */}
        <div className="absolute inset-0 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Route line */}
            <path
              d="M 50 700 Q 200 600 350 500 Q 300 400 200 300 Q 100 200 300 100"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              fill="none"
              className="animate-pulse-glow"
            />
            {/* Current position */}
            <circle cx="50" cy="700" r="8" fill="hsl(var(--primary))" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-12 left-4 right-4 flex justify-between z-10">
        <button 
          onClick={() => onScreenChange?.('home')}
          className="map-control"
        >
          <Home size={24} />
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="map-control"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      {/* Speed Display */}
      <div className="absolute top-12 right-4 z-10">
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-primary">{currentSpeed}</div>
          <div className="text-xs text-foreground-secondary">mph</div>
          <div className="text-xs text-muted-foreground mt-1">Limit: {speedLimit}</div>
        </div>
      </div>

      {/* Turn Instructions */}
      <div className="absolute top-1/3 left-4 right-4 z-10">
        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-full">
              <ArrowRight size={32} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xl font-bold text-high-contrast">
                {navigationData.nextTurn}
              </div>
              <div className="text-lg text-primary font-semibold">
                in {navigationData.distance}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-success" />
              <div>
                <div className="font-semibold">ETA {navigationData.eta}</div>
                <div className="text-sm text-foreground-secondary">
                  {navigationData.remaining} remaining
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{navigationData.totalDistance}</div>
              <div className="text-sm text-foreground-secondary">total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Button (Always Visible) */}
      <div className="absolute bottom-32 right-4 z-20">
        <button className="emergency-button w-16 h-16">
          <Zap size={24} />
        </button>
      </div>
    </div>
  );
};

export default NavigationScreen;