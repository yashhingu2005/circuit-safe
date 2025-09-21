import { useEffect, useState } from 'react';
import motorcycleImage from '@/assets/motorcycle-wheelie.png';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Show logo after motorcycle animation
    setTimeout(() => setShowLogo(true), 1500);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-hero flex flex-col items-center justify-center z-50">
      {/* Motorcycle Animation */}
      <div className="relative w-full max-w-md mb-8">
        <img 
          src={motorcycleImage}
          alt="Motorcycle performing wheelie"
          className="w-64 h-32 mx-auto animate-motorcycle-enter filter brightness-0 invert opacity-80"
        />
      </div>

      {/* App Logo */}
      <div className={`text-center transition-all duration-500 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl font-bold text-high-contrast mb-2">
          RideGuard
        </h1>
        <p className="text-foreground-secondary text-lg">
          Your Riding Companion
        </p>
      </div>

      {/* Loading Progress */}
      <div className="absolute bottom-16 left-8 right-8">
        <div className="bg-card/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  (progress > index * 33) ? 'bg-primary animate-pulse-glow' : 'bg-muted'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;