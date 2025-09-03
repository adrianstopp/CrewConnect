import { UserLocation } from '../types/activity';

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance);
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Get user's current location using geolocation API
export function getCurrentLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // In a real app, you'd use a geocoding service to get city/state
          // For demo purposes, we'll use a mock response
          const location = await mockGeocodeLocation(latitude, longitude);
          resolve(location);
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

// Mock geocoding function - in a real app, you'd use a service like Google Maps API
async function mockGeocodeLocation(lat: number, lng: number): Promise<UserLocation> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock city detection based on coordinates (simplified)
  const cities = [
    { name: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
    { name: 'New York', state: 'NY', lat: 40.7128, lng: -74.0060 },
    { name: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
    { name: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
    { name: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
    { name: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
    { name: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  ];
  
  // Find the closest city
  let closestCity = cities[0];
  let minDistance = calculateDistance(lat, lng, cities[0].lat, cities[0].lng);
  
  for (const city of cities) {
    const distance = calculateDistance(lat, lng, city.lat, city.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }
  
  return {
    city: closestCity.name,
    state: closestCity.state,
    coordinates: { lat, lng }
  };
}

// Predefined major cities for manual selection
export const MAJOR_CITIES: UserLocation[] = [
  { city: 'San Francisco', state: 'CA', coordinates: { lat: 37.7749, lng: -122.4194 } },
  { city: 'New York', state: 'NY', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { city: 'Los Angeles', state: 'CA', coordinates: { lat: 34.0522, lng: -118.2437 } },
  { city: 'Chicago', state: 'IL', coordinates: { lat: 41.8781, lng: -87.6298 } },
  { city: 'Austin', state: 'TX', coordinates: { lat: 30.2672, lng: -97.7431 } },
  { city: 'Seattle', state: 'WA', coordinates: { lat: 47.6062, lng: -122.3321 } },
  { city: 'Denver', state: 'CO', coordinates: { lat: 39.7392, lng: -104.9903 } },
  { city: 'Atlanta', state: 'GA', coordinates: { lat: 33.7490, lng: -84.3880 } },
  { city: 'Miami', state: 'FL', coordinates: { lat: 25.7617, lng: -80.1918 } },
  { city: 'Portland', state: 'OR', coordinates: { lat: 45.5152, lng: -122.6784 } },
  { city: 'Asheville', state: 'NC', coordinates: { lat: 35.5951, lng: -82.5515 } },
];