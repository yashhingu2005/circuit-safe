import { MapPin, Route, Users, Settings, AlertTriangle } from 'lucide-react';

interface NavItem {
  icon: typeof MapPin;
  label: string;
  screen: 'home' | 'routes' | 'community' | 'profile' | 'emergency';
  isEmergency?: boolean;
}

const navItems: NavItem[] = [
  { icon: MapPin, label: 'Home', screen: 'home' },
  { icon: Route, label: 'Routes', screen: 'routes' },
  { icon: AlertTriangle, label: 'SOS', screen: 'emergency', isEmergency: true },
  { icon: Users, label: 'Community', screen: 'community' },
  { icon: Settings, label: 'Profile', screen: 'profile' },
];

const BottomNavigation = ({ 
  currentScreen, 
  onScreenChange, 
  onEmergencyTrigger 
}: {
  currentScreen: string;
  onScreenChange: (screen: 'home' | 'navigation' | 'routes' | 'community' | 'profile') => void;
  onEmergencyTrigger: () => void;
}) => {

  const handleNavigation = (screen: NavItem['screen']) => {
    if (screen === 'emergency') {
      onEmergencyTrigger();
    } else {
      onScreenChange(screen as any);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-secondary/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          const isEmergency = item.isEmergency;
          
          return (
            <button
              key={item.screen}
              onClick={() => handleNavigation(item.screen)}
              className={`
                touch-target flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200
                ${isEmergency 
                  ? 'emergency-button transform scale-110' 
                  : isActive 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-foreground-muted hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon 
                size={isEmergency ? 28 : 24} 
                className={isEmergency ? 'text-white' : undefined}
              />
              <span className={`text-xs font-medium ${isEmergency ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;