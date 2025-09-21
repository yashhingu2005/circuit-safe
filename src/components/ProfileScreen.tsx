import { useState } from 'react';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Moon, 
  Volume2, 
  MapPin, 
  Award,
  Bike,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const ProfileScreen = () => {
  const [userStats] = useState({
    totalMiles: 1234,
    routesCompleted: 47,
    safetyScore: 98,
    communityRank: 'Gold Rider'
  });

  const [achievements] = useState([
    { name: 'Safety First', description: '100 rides without incident', earned: true },
    { name: 'Explorer', description: 'Completed 25 scenic routes', earned: true },
    { name: 'Community Hero', description: 'Helped 10 riders', earned: false },
    { name: 'Mountain Master', description: 'Conquered 10 mountain passes', earned: true },
  ]);

  const settingsGroups = [
    {
      title: 'Safety & Emergency',
      icon: Shield,
      items: [
        { label: 'Crash Detection', value: 'Enabled', critical: true },
        { label: 'Emergency Contacts', value: '3 contacts' },
        { label: 'Location Sharing', value: 'Family only' },
        { label: 'Medical Information', value: 'Complete' }
      ]
    },
    {
      title: 'Navigation',
      icon: MapPin,
      items: [
        { label: 'Voice Navigation', value: 'On' },
        { label: 'Route Preferences', value: 'Scenic' },
        { label: 'Avoid Highways', value: 'Off' },
        { label: 'Speed Alerts', value: 'On' }
      ]
    },
    {
      title: 'App Settings',
      icon: Settings,
      items: [
        { label: 'Notifications', value: 'All' },
        { label: 'Dark Mode', value: 'Always' },
        { label: 'High Contrast', value: 'Auto' },
        { label: 'Glove Mode', value: 'On' }
      ]
    }
  ];

  return (
    <div className="pb-20 bg-gradient-hero min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <User size={40} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-high-contrast">RiderMike82</h1>
            <p className="text-foreground-secondary">{userStats.communityRank}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="status-online"></div>
              <span className="text-sm text-success">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userStats.totalMiles.toLocaleString()}</div>
            <div className="text-sm text-foreground-secondary">Total Miles</div>
          </Card>
          <Card className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-success">{userStats.routesCompleted}</div>
            <div className="text-sm text-foreground-secondary">Routes Complete</div>
          </Card>
        </div>
        <Card className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield size={24} className="text-success" />
              <div>
                <div className="font-semibold">Safety Score</div>
                <div className="text-sm text-foreground-secondary">Excellent rating</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-success">{userStats.safetyScore}%</div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-high-contrast">Recent Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.slice(0, 4).map((achievement, index) => (
            <Card key={index} className={`glass-card p-3 text-center ${achievement.earned ? '' : 'opacity-50'}`}>
              <Award 
                size={24} 
                className={`mx-auto mb-2 ${achievement.earned ? 'text-warning fill-warning' : 'text-muted'}`}
              />
              <div className="text-sm font-medium">{achievement.name}</div>
              <div className="text-xs text-foreground-secondary mt-1">{achievement.description}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-6 space-y-4">
        {settingsGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <Card key={group.title} className="glass-card p-4">
              <div className="flex items-center space-x-3 mb-4">
                <GroupIcon size={24} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
              </div>
              <div className="space-y-3">
                {group.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between touch-target">
                    <div className="flex-1">
                      <div className={`font-medium ${item.critical ? 'text-foreground' : 'text-foreground'}`}>
                        {item.label}
                        {item.critical && (
                          <span className="ml-2 px-2 py-1 bg-destructive/20 text-destructive text-xs rounded-full">
                            Critical
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground-secondary text-sm">{item.value}</span>
                      <ChevronRight size={16} className="text-foreground-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bike Information */}
      <div className="px-6 mt-6">
        <Card className="glass-card p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Bike size={24} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">My Bike</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-foreground-secondary">Make & Model</div>
              <div className="font-medium">Yamaha MT-07</div>
            </div>
            <div>
              <div className="text-foreground-secondary">Year</div>
              <div className="font-medium">2023</div>
            </div>
            <div>
              <div className="text-foreground-secondary">Mileage</div>
              <div className="font-medium">8,432 miles</div>
            </div>
            <div>
              <div className="text-foreground-secondary">Last Service</div>
              <div className="font-medium">2 weeks ago</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileScreen;