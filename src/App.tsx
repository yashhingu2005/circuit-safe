import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import NavigationScreen from './components/NavigationScreen';
import RouteScreen from './components/RouteScreen';
import CommunityFeed from './components/CommunityFeed';
import ProfileScreen from './components/ProfileScreen';
import EmergencyScreen from './components/EmergencyScreen';
import BottomNavigation from './components/BottomNavigation';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showEmergency, setShowEmergency] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'navigation' | 'routes' | 'community' | 'profile'>('home');

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleEmergencyClose = () => {
    setShowEmergency(false);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'navigation':
        return <NavigationScreen onScreenChange={setCurrentScreen} />;
      case 'routes':
        return <RouteScreen />;
      case 'community':
        return <CommunityFeed />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomePage onScreenChange={setCurrentScreen} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="motorcycle-app bg-background text-foreground min-h-screen">
          {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
          
          {!isLoading && (
            <>
              {renderCurrentScreen()}
              <BottomNavigation 
                currentScreen={currentScreen}
                onScreenChange={setCurrentScreen}
                onEmergencyTrigger={() => setShowEmergency(true)}
              />
              {showEmergency && <EmergencyScreen onClose={handleEmergencyClose} />}
            </>
          )}
        </div>
        
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
