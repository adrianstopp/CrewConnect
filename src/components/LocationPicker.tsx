import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapPin, Loader2, Navigation, Search } from 'lucide-react';
import { UserLocation } from '../types/activity';
import { getCurrentLocation, MAJOR_CITIES } from '../utils/location';
import { toast } from 'sonner@2.0.3';

interface LocationPickerProps {
  userLocation: UserLocation | null;
  onLocationChange: (location: UserLocation) => void;
}

export function LocationPicker({ userLocation, onLocationChange }: LocationPickerProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<UserLocation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update search value when location changes
  useEffect(() => {
    if (userLocation) {
      setSearchValue(`${userLocation.city}, ${userLocation.state}`);
      setShowSuggestions(false);
    }
  }, [userLocation]);

  // Filter cities based on search input
  useEffect(() => {
    if (searchValue.length > 0) {
      const filtered = MAJOR_CITIES.filter(city => 
        `${city.city}, ${city.state}`.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(filtered.length > 0 && searchValue !== `${userLocation?.city}, ${userLocation?.state}`);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  }, [searchValue, userLocation]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    
    try {
      const location = await getCurrentLocation();
      onLocationChange(location);
      toast.success(`Location set to ${location.city}, ${location.state}`);
    } catch (error) {
      toast.error('Unable to detect your location. Please select manually.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleCitySelect = (city: UserLocation) => {
    onLocationChange(city);
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    if (filteredCities.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="flex items-center gap-2 min-w-0">
        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm text-muted-foreground">Location:</span>
        {userLocation ? (
          <span className="text-sm font-medium truncate">
            {userLocation.city}, {userLocation.state}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Enter your location</span>
        )}
      </div>
      
      <div className="flex gap-2 flex-wrap relative">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="gap-1"
        >
          {isDetecting ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Navigation className="w-3 h-3" />
          )}
          {isDetecting ? 'Detecting...' : 'Use Current'}
        </Button>
        
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for a city..."
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleKeyDown}
              className="w-64 pl-10"
            />
          </div>
          
          {/* Suggestions Dropdown */}
          {showSuggestions && filteredCities.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
            >
              {filteredCities.map((city) => (
                <button
                  key={`${city.city}, ${city.state}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span>{city.city}, {city.state}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}