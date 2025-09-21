import { useState, useEffect } from 'react';
import { Phone, MapPin, AlertTriangle, X, Clock } from 'lucide-react';

const EmergencyScreen = ({ onClose }: { onClose: () => void }) => {
  const [countdown, setCountdown] = useState(10);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [emergencyContacts] = useState([
    { name: 'Emergency Services', number: '911', priority: 1 },
    { name: 'Sarah (Wife)', number: '+1 (555) 123-4567', priority: 2 },
    { name: 'Mike (Brother)', number: '+1 (555) 987-6543', priority: 3 },
  ]);

  const [currentLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    address: 'Highway 101, Mile Marker 23, San Francisco, CA'
  });

  useEffect(() => {
    if (!isCountingDown) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsCountingDown(false);
          // In a real app, this would trigger emergency calls
          console.log('Emergency protocols activated');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCountingDown]);

  const handleImOk = () => {
    setIsCountingDown(false);
    onClose();
  };

  const handleCallEmergency = (contact: typeof emergencyContacts[0]) => {
    console.log(`Calling ${contact.name} at ${contact.number}`);
    // In a real app, this would initiate a phone call
  };

  return (
    <div className="fixed inset-0 bg-gradient-emergency z-50 flex flex-col">
      {/* Close Button */}
      <div className="absolute top-12 right-6 z-10">
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <X size={24} className="text-white" />
        </button>
      </div>

      {/* Emergency Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8">
          <AlertTriangle 
            size={80} 
            className="text-white mx-auto mb-4 animate-emergency-pulse" 
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            Emergency Detected
          </h1>
          <p className="text-white/80 text-lg">
            Crash or sudden stop detected
          </p>
        </div>

        {/* Countdown or Status */}
        {isCountingDown ? (
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-white mb-4 animate-pulse">
              {countdown}
            </div>
            <p className="text-white/80 text-xl">
              Emergency services will be contacted
            </p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <Clock size={60} className="text-white mx-auto mb-4" />
            <p className="text-white text-xl">
              Emergency protocols ready
            </p>
          </div>
        )}

        {/* I'm OK Button */}
        <button
          onClick={handleImOk}
          className="w-full max-w-sm bg-white text-black font-bold text-2xl py-6 rounded-2xl mb-8 touch-target hover:bg-white/90 transition-all duration-200 shadow-lg"
        >
          I'M OKAY
        </button>

        {/* Location Info */}
        <div className="w-full max-w-sm bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <MapPin size={24} className="text-white mt-1" />
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Current Location</h3>
              <p className="text-white/80 text-sm">{currentLocation.address}</p>
              <p className="text-white/60 text-xs mt-1">
                {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="px-6 pb-8">
        <h2 className="text-white font-bold text-xl mb-4">Emergency Contacts</h2>
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <button
              key={contact.name}
              onClick={() => handleCallEmergency(contact)}
              className="w-full bg-black/30 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4 touch-target hover:bg-black/50 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Phone size={24} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold">{contact.name}</h3>
                <p className="text-white/70 text-sm">{contact.number}</p>
              </div>
              <div className="text-white/60 text-sm">
                #{contact.priority}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyScreen;